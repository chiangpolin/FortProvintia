import os
import requests
import base64
from dotenv import load_dotenv

load_dotenv()


engine_id = "stable-diffusion-xl-1024-v1-0"
api_host = os.getenv("API_HOST", "https://api.stability.ai")
api_key = os.getenv("API_KEY")
input_path = os.getenv("INPUT_IMAGE_PATH")
output_path = os.getenv("OUTPUT_IMAGE_PATH")

if api_key is None:
    raise Exception("Missing Stability API key.")

prompt = "16th-century, Dutch colony, historical scene, realistic, coastal atmosphere"

response = requests.post(
    f"{api_host}/v1/generation/{engine_id}/image-to-image",
    headers={
        "Accept": "application/json",
        "Authorization": f"Bearer {api_key}"
    },
    files={
        "init_image": open(input_path, "rb")
    },
    data={
        "image_strength": 0.4,
        "init_image_mode": "IMAGE_STRENGTH",
        "text_prompts[0][text]": prompt,
        "cfg_scale": 8,
        "samples": 1,
        "steps": 30,
        "seed": 205,
    }
)

if response.status_code != 200:
    raise Exception("Non-200 response: " + str(response.text))

data = response.json()

for i, image in enumerate(data["artifacts"]):
    with open(output_path, "wb") as f:
        f.write(base64.b64decode(image["base64"]))