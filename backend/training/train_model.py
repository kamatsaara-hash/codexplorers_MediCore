#backend\training\train_model.py
import pandas as pd
import joblib
import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder

from app.ai_model.preprocess import clean_text

# Load dataset
df = pd.read_csv(os.path.join(os.path.dirname(__file__), "..", "cleaned_dataset.csv"))

# Apply preprocessing
df["text"] = df["text"].apply(clean_text)

X = df["text"]
y = df["disease"]

# Encode labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Vectorize text
vectorizer = TfidfVectorizer(stop_words="english")
X_vectorized = vectorizer.fit_transform(X)

# Train model
model = LogisticRegression(max_iter=1000)
model.fit(X_vectorized, y_encoded)

# Save files
output_dir = "../app/ai_model"
os.makedirs(output_dir, exist_ok=True)

joblib.dump(model, f"{output_dir}/model.pkl")
joblib.dump(vectorizer, f"{output_dir}/vectorizer.pkl")
joblib.dump(label_encoder, f"{output_dir}/label_encoder.pkl")

print("✅ Model trained and saved!")