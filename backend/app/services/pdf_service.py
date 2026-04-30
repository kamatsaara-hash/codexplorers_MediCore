from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

def generate_pdf(data, filename="report.pdf"):
    doc = SimpleDocTemplate(filename)
    styles = getSampleStyleSheet()

    content = []

    content.append(Paragraph(f"Patient Name: {data['name']}", styles["Normal"]))
    content.append(Paragraph(f"Symptoms: {data['symptoms']}", styles["Normal"]))
    content.append(Paragraph(f"Disease: {data['disease']}", styles["Normal"]))
    content.append(Paragraph(f"Severity: {data['severity']}", styles["Normal"]))
    content.append(Paragraph(f"Specialization: {data['specialization']}", styles["Normal"]))

    doc.build(content)

    return filename