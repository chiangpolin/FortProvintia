# Fort Provintia

Visit the [Website](https://fort.chiangpolin.com/)

This project is an interactive 3D visualization project that integrates AI-generated images with web-based 3D rendering. 

The project consists of 
A backend for AI image generation using **Stable Diffusion** 
A frontend built with **Next.js** and **Three.js** for interactive visualization.

```
├── backend/
│   ├── src/
│   │   ├── api/          # Connect to Stable Diffusion API
│   │   ├── pipeline/     # Colab pipelines for image generation
│   │   └── utils/        # Utility functions for image processing, helpers
│   └── static/           # Static files used by backend
│
├── frontend/
│   ├── public/           # Public assets
│   └── src/
│       ├── app/          # Next.js app components
│       └── pages/
│           └── demo.js   # Demo page using Three.js
```

## Backend

The backend is implemented in **Python** and handles the AI image generation using **Stable Diffusion**.

### API

- Connects to Stable Diffusion API: 
  - `https://api.stability.ai/v2beta/stable-image/generate/sd3`
    | Original | AI-Generated |
    |----------|--------------|
    | ![Original](/backend/static/scenes/scene_1/0.png) | ![Generated](/backend/static/images/stable_image.png) |
  - `https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image`
    | Original | AI-Generated |
    |----------|--------------|
    | ![Original](/backend/static/scenes/scene_1/0.png) | ![Generated](/backend/static/images/image_to_image.png) |
- Handles request/response formatting and error handling

### Pipeline

- Implements Colab-based pipelines for image generation
  - `/backend/src/pipeline/diffusion.ipynb`
  - `/backend/src/pipeline/refiner.ipynb`
- Supports multiple Stable Diffusion models:
  - `stable-diffusion-v1-5`  
  - `stabilityai/stable-diffusion-xl-refiner-1.0`
- Handles preprocessing, generation, and postprocessing of images

### Utils

- Helper functions for:
  - Image resizing, conversion, and normalization
  - Logging and error handling
  - File storage and retrieval

---

## Frontend

The frontend is built with **Next.js** and integrates **Three.js** for interactive 3D visualization.

- **Demo page:** `pages/demo.js`  
  - Renders interactive 3D content 
![plot](/frontend/public/static/website_1.png) 
  - Allows selecting different camera views 
![plot](/frontend/public/static/website_2.png) 
  - Displays 3D models without background
![plot](/frontend/public/static/website_4.png)
  - Captures snapshots of the rendered scene
![plot](/frontend/public/static/website_3.png)
- Integrates with backend-generated images for enhanced visualization.

---

## Overview Workflow

1. **User interaction on frontend** triggers a request for an AI-generated image.  
2. **Backend pipeline** processes the input, generates or refines the image using Stable Diffusion.  
3. **Processed image** is returned to the frontend.  
4. **Frontend** renders the image alongside interactive 3D models using Three.js.  
5. Users can manipulate camera angles, view models without backgrounds, and capture snapshots.  

