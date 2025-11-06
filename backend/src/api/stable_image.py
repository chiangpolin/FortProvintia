import os
import requests
from dotenv import load_dotenv

load_dotenv()


api_key = os.getenv("API_KEY")
input_path = os.getenv("INPUT_IMAGE_PATH")
output_path = os.getenv("OUTPUT_IMAGE_PATH")

if not api_key:
    raise ValueError("API_KEY not found")

prompt = "16th-century, Dutch colony, historical scene, realistic, coastal atmosphere"

response = requests.post(
    "https://api.stability.ai/v2beta/stable-image/generate/sd3",
    headers={
        "authorization": f"Bearer {api_key}",
        "accept": "image/*"
    },
    files={
        "image": open(input_path, "rb"),
    },
    data={
        "prompt": prompt,
        "mode": 'image-to-image',
        "strength": 0.65,
        "output_format": "png",
        "model": 'sd3.5-flash',
        "seed": 120,
        "style_preset": 'photographic',
    },
    timeout=600,
)

if response.status_code == 200:
    with open(output_path, "wb") as f:
        f.write(response.content)
    print("success")
else:
    print("error:", response.text)