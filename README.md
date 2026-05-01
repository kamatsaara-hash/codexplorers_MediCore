# 🏥 MediCore - Hospital Management System

MediCore is a modern, full-stack Hospital Management System designed to bridge the gap between patients, doctors, and administrators. It features an advanced AI-driven symptom prediction engine that accurately diagnoses patients and recommends the most appropriate specialists in real-time.

## 🚀 Features
- **AI Symptom Analysis:** Patients input their symptoms, and the backend Scikit-Learn NLP model predicts the likely disease and severity, and routes them to the right specialist.
- **Automated Medical Reports:** Instantly generate professional, downloadable PDF diagnostic reports for patients.
- **Role-Based Access Control (RBAC):** Secure access separated into three distinct roles: Admin, Doctor, and Patient.
- **Smart Appointment Scheduling:** Patients can instantly book recommended doctors, and doctors can manage their patient queues dynamically.

---

## 🛠 Tech Stack
- **Frontend:** React.js, Vite, TypeScript, Tailwind CSS
- **Backend:** Python, FastAPI, Scikit-Learn, ReportLab
- **Database:** MongoDB Atlas (Motor Asyncio)

---

## 📡 API Endpoints Documentation

The FastAPI backend runs on `http://127.0.0.1:8000` locally. All API endpoints accept and return `application/json` unless otherwise specified.

### 🔐 Authentication (`/auth`)

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/signup` | Registers a new patient | `{ name, email, phone, age, gender, password }` |
| `POST` | `/auth/login` | Authenticates Admin, Doctor, or Patient | `{ email, password, role }` |

### 🧠 AI Diagnostics (`/ai`)

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/ai/predict` | Analyzes symptoms and returns AI prediction, confidence, severity, and recommended doctors | `{ symptoms: "severe headache and fever" }` |
| `POST` | `/ai/generate-pdf` | Generates a downloadable Medical Report (PDF) | Diagnostic JSON Data |

### 📅 Appointments (`/appointments`)

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/appointments/book` | Books an appointment with a specific doctor | `{ doctor_id, patient_email, date }` |
| `GET`  | `/appointments/patient/{email}` | Retrieves all active appointments for a specific patient | *None* |
| `PUT`  | `/appointments/{id}/status` | Updates the status of an appointment (e.g., Completed/Cancelled) | `{ status: "completed" }` |

### 🩺 Doctors (`/doctors`)

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET`  | `/doctors/` | Retrieves a list of all registered doctors | *None* |

### 👑 Admin (`/admin`)

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET`  | `/admin/patients-grouped` | Retrieves all patients actively grouped by their assigned doctors for admin monitoring | *None* |

### 💊 Pharmacy (`/pharmacy`)

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET`  | `/pharmacy/` | Retrieves available hospital medicine inventory | *None* |

---

## 💻 Local Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/kamatsaara-hash/codexplorers_MediCore.git
cd codexplorers_MediCore
```

### 2. Backend Setup
```bash
cd backend
# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn app.main:app --reload
```
*Note: Make sure your `.env` file is present in the `/backend` folder with `MONGO_URI`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.*

### 3. Frontend Setup
```bash
cd frontend
# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

---

## 🤖 AI Model Retraining
If you want to add new diseases or symptoms:
1. Update `backend/training/dataset.csv`
2. Run data cleaner: `python backend/clean_dataset.py`
3. Retrain the `.pkl` models: `python backend/training/train_model.py`
