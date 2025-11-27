import os
import json
import tempfile
import markdown
from flask import Flask, request, redirect, url_for, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

# Import your custom agents
try:
    from multimodel_medical_agent import MultimodalMedicalAgent
    from patient_advisor import PatientConsultantAgent
    from patient_advisor import ConsultationSummaryJSON 
    from prescription_reader import PrescriptionReaderAgent
    # Corrected Agent Import (using the correct file name)
    from doctor_agent import DoctorAssistant
    
except ImportError as e:
    print(f"Error importing agents: {e}")
    print("Please make sure all necessary files are in the current directory.")
    exit(1)

app = Flask(__name__)
CORS(app)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "A_SECURE_FALLBACK_KEY_") 

# --- CONFIGURATION ---
if not os.getenv("GOOGLE_API_KEY"):
    print("⚠️  WARNING: GOOGLE_API_KEY not found in environment variables.")

# Initialize Agents
try:
    extractor_agent = MultimodalMedicalAgent()
    consultant_agent = PatientConsultantAgent()
    prescription_agent = PrescriptionReaderAgent()
    # Corrected Agent Initialization (using a descriptive name)
    symptom_agent = DoctorAssistant()

except Exception as e:
    print(f"Failed to initialize agents: {e}")

# Helper function to generate standardized error response
def generate_error_response(message, status_code=400):
    return jsonify({
        "status": "error",
        "message": message
    }), status_code

# Helper function for new symptom analysis output
def format_symptom_analysis_to_markdown(data):
    """Converts the SymptomAnalysisResult JSON structure into a readable Markdown string."""
    md = f"**{data.get('disclaimer_and_urgency', 'Disclaimer: No professional medical advice provided.')}**\n\n"
    md += "## 1. What You Might Be Experiencing\n"
    md += f"{data.get('current_condition_analysis', 'N/A')}\n\n"
    
    md += "## 2. Possible Medical Problems\n"
    problems = data.get('possible_medical_problems', [])
    md += "\n".join([f"- {p}" for p in problems]) if problems else "- N/A\n"
    md += "\n\n"
    
    md += "## 3. Immediate Actions to Take\n"
    actions = data.get('immediate_actions', [])
    md += "\n".join([f"- {a}" for a in actions]) if actions else "- N/A\n"
    md += "\n\n"
    
    md += "## 4. Recommended Specialist\n"
    md += f"**Specialist:** {data.get('recommended_specialist', 'General Practitioner (GP)')}\n\n"
    
    md += f"***\n{data.get('final_statement', 'N/A')}"
    return md


# --- ROUTE 1: Medical Consultation (Lab Reports, Clinical Notes, etc.) ---

@app.route('/analyze_reports', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # 1. Handle File Upload and Basic Checks
        if 'file' not in request.files:
            return generate_error_response('No file part in the request.')
        
        file = request.files['file']
        
        if file.filename == '':
            return generate_error_response('No selected file.')

        if 'extractor_agent' not in globals() or 'consultant_agent' not in globals():
            return generate_error_response("System Error: AI agents failed to initialize. Check GOOGLE_API_KEY.", 500)

        tmp_path = None
        try:
            # Save file temporarily
            suffix = os.path.splitext(file.filename)[1]
            with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp_file:
                file.save(tmp_file.name)
                tmp_path = tmp_file.name

            # 2. Get Patient Profile from Form
            patient_profile = {
                "name": request.form.get('name', 'Unknown'),
                "age": request.form.get('age', ''), 
                "gender": request.form.get('gender', 'Unknown'),
                "history": request.form.get('history', 'None'),
                "complaints": request.form.get('complaints', 'None')
            }

            # 3. Run Step 1: Extraction Agent
            raw_json_str = extractor_agent.analyze_file(tmp_path)
            
            # Check for errors in extraction
            try:
                structured_data = json.loads(raw_json_str)
            except json.JSONDecodeError:
                return generate_error_response("Extraction Error: The AI failed to generate valid JSON data.", 500)

            if "error" in structured_data:
                return generate_error_response(f"Extraction Agent Failed: {structured_data['error']}", 500)

            # 4. Run Step 2: Consultant Agent (Markdown Output)
            doctor_summary_md = consultant_agent.generate_consultation(
                report_analysis=structured_data,
                patient_profile=patient_profile,
                json_output=False # Explicitly request Markdown
            )

            # 5. Run Step 2: Consultant Agent (Structured JSON Output)
            doctor_summary_json_str = consultant_agent.generate_consultation(
                report_analysis=structured_data,
                patient_profile=patient_profile,
                json_output=True
            )
            
            # Check for consultant agent errors
            if doctor_summary_md.startswith("Error generating consultation:"):
                return generate_error_response(f"Consultant Agent Failed (Markdown): {doctor_summary_md}", 500)
            
            # Attempt to parse the JSON string into a dictionary
            try:
                doctor_summary_json = json.loads(doctor_summary_json_str)
                ConsultationSummaryJSON.model_validate(doctor_summary_json)
            except Exception as e:
                 return generate_error_response(f"Consultant Agent Failed (JSON parsing/validation): {str(e)}", 500)

            # --- SUCCESS RESPONSE: RETURN JSON ---
            return jsonify({
                "status": "success",
                "service": "Medical Consultation",
                "patient_profile": patient_profile,
                "structured_medical_data": structured_data,
                "consultation_summary_markdown": doctor_summary_md,
                "consultation_summary_html": markdown.markdown(doctor_summary_md),
                "consultation_summary_json": doctor_summary_json
            }), 200

        except Exception as e:
            # Catch file operations errors or unexpected exceptions
            return generate_error_response(f"An unexpected server error occurred: {str(e)}", 500)
        finally:
            # Cleanup temp file
            if tmp_path and os.path.exists(tmp_path):
                os.remove(tmp_path)

    # For GET request, we return a simple JSON status or error message
    return jsonify({
        "status": "info",
        "message": "Send a POST request with a 'file' and patient profile data to initiate analysis."
    }), 200

# --- ROUTE 2: Prescription Analysis (Image-based) ---

@app.route('/analyze_prescription', methods=['POST'])
def analyze_prescription():
    # 1. Check file upload
    if 'file' not in request.files:
        return generate_error_response("No file part"), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return generate_error_response("No selected file"), 400

    if 'prescription_agent' not in globals():
        return generate_error_response("System Error: Prescription Agent failed to initialize.", 500)
    
    tmp_path = None
    try:
        # Save file temporarily (required for PIL.Image.open and agent input)
        suffix = os.path.splitext(file.filename)[1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp_file:
            file.save(tmp_file.name)
            tmp_path = tmp_file.name

        # 2. Run the two-step Prescription Agent
        analysis_result = prescription_agent.analyze_prescription_image(tmp_path)
        
        # 3. Check for errors from the agent
        if "error" in analysis_result:
            return generate_error_response(f"Prescription Analysis Failed: {analysis_result['error']}", 500)

        # 4. Return Success
        return jsonify({
            "status": "success",
            "service": "Prescription Analysis",
            "raw_extraction": analysis_result["raw_extraction"],
            "analysis": analysis_result["analysis"]
        }), 200

    except Exception as e:
        return generate_error_response(f"An unexpected server error occurred during prescription analysis: {str(e)}", 500)
    finally:
        # Cleanup temp file
        if tmp_path and os.path.exists(tmp_path):
            os.remove(tmp_path)


# --- ROUTE 3: Symptom Analysis (Text-based) ---

@app.route('/doctor_assistant', methods=['POST'])
def analyze_symptoms_route():
    # 1. Get symptoms from request body
    data = request.get_json(silent=True)
    if not data or 'symptoms' not in data:
        return generate_error_response("Missing 'symptoms' field in request JSON.", 400)
        
    symptoms = data['symptoms']
    if not symptoms or not isinstance(symptoms, str):
        return generate_error_response("Symptoms must be a non-empty string.", 400)

    if 'symptom_agent' not in globals():
        return generate_error_response("System Error: Symptom Analysis Agent failed to initialize.", 500)

    try:
        # 2. Run the Doctor Assistant Agent (returns JSON string)
        analysis_json_str = symptom_agent.analyze(symptoms)
        
        # 3. Parse the JSON result
        try:
            analysis_data = json.loads(analysis_json_str)
        except json.JSONDecodeError:
            # This handles the case where the AI returns non-JSON text or a malformed error JSON
            return generate_error_response("Analysis Error: AI failed to generate valid JSON.", 500)

        # 4. Check for internal errors from the agent's try/except block (which returns {"error": "..."})
        if "error" in analysis_data:
            return generate_error_response(f"Symptom Analysis Failed: {analysis_data['error']}", 500)

        # 5. Return Success with structured JSON and a formatted Markdown string
        return jsonify({
            "status": "success",
            "service": "Symptom Analysis",
            "input_symptoms": symptoms,
            "analysis_json": analysis_data,
            "analysis_markdown": format_symptom_analysis_to_markdown(analysis_data)
        }), 200

    except Exception as e:
        return generate_error_response(f"An unexpected server error occurred during symptom analysis: {str(e)}", 500)


if __name__ == '__main__':
    app.run(debug=True, port=5001)