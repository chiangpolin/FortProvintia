import os
import cv2
import numpy as np
from dotenv import load_dotenv

load_dotenv()


input_path = os.getenv("INPUT_IMAGE_PATH")
output_path = os.getenv("OUTPUT_IMAGE_PATH")

img = cv2.imread(input_path)
mask = np.any(img > 10, axis=2).astype(np.uint8) * 255  # threshold = 10 to ignore compression noise
mask = cv2.medianBlur(mask, 3)
cv2.imwrite(output_path, mask)