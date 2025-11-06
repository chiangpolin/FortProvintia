# Fort Provintia

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

- Connects to Stable Diffusion API: `https://api.stability.ai/v2beta/stable-image/generate/sd3`
- Supports **Stable Diffusion XL 1024 v1.0**
- Handles request/response formatting and error handling

### Pipeline

- Implements Colab-based pipelines for image generation
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

- Built with **Next.js**
- Uses **Three.js** for interactive 3D visualization
- Demo page: `pages/demo.js` demonstrates rendering 3D content and integrating with backend-generated images
