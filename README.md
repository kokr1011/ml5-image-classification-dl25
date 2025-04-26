
# 📷 Image Classification Web App using MobileNet and ml5.js

This web application allows users to classify images using a pretrained MobileNet model directly in the browser.  
Static sample images are classified on page load, and users can upload their own images for classification via a clean, Material Design-based user interface.

---

## 🚀 Features

- ✅ Classify predefined sample images with MobileNet (ml5.js)
- ✅ Upload and classify your own images (drag & drop or file selection)
- ✅ Responsive design (mobile-friendly)
- ✅ Clear visualization of classification results (Chart.js bar charts)
- ✅ Material Design styling (Teal or Blue Theme)
- ✅ Error handling for unsupported file formats and sizes
- ✅ Instant feedback after classification

---

## 📁 Project Structure

```plaintext
ml5-image-classification-dl25/
│
├── images/                  # Static images for classification (e.g., bird.jpg, bike.jpg, labrador.png, etc.)
├── style.css                 # Main Material Design stylesheet (Teal or Blue theme)
├── sketch.js                 # JavaScript logic (loading, classifying, dynamic rendering)
├── index.html                # Main HTML file (page structure and script integration)
├── README.md                 # Project documentation and instructions
└── documentation.html        # (optional) Full detailed technical and subject-specific documentation
```

---

## 📦 Installation & Usage

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ml5-image-classification-dl25.git
cd ml5-image-classification-dl25
```

### 2. Open the project

Open `index.html` directly in your browser, or host the project using GitHub Pages.

---

## 🌐 Live Demo

> Hosted on GitHub Pages:  
> **[👉 View the Live Site](https://kokr1011.github.io/ml5-image-classification-dl25/)**

---

## 📚 Frameworks and Libraries Used

- [p5.js](https://p5js.org/) – For basic image loading, DOM manipulation, and canvas management.
- [ml5.js](https://ml5js.org/) – Simplified machine learning API (pretrained MobileNet model).
- [Chart.js](https://www.chartjs.org/) – For rendering bar charts displaying classification confidence.
- [GitHub Pages](https://docs.github.com/en/pages) – Static hosting service used for deployment.

---

## 🎨 Design & UX Principles

- Based on Google's [Material Design Guidelines](https://material.io/design/):
  - Clear typography, consistent elevation (shadows), rounded corners, and responsive layouts.
  - Teal (primary) or Blue (optional) color themes.
- Human-Computer Interaction (HCI) principles according to [ISO 9241-110]:
  - **Suitability for the task:** Clean, direct workflows from upload to classification.
  - **Self-descriptiveness:** Clear labels, context-sensitive feedback, and visible hints.
  - **Error tolerance:** Only allows uploading JPG/PNG images under 5MB; user is informed about incorrect uploads.
  - **Feedback:** Instant success or error messages after each classification action.

---

## 🧠 Observations and Discussion

During testing, the pretrained MobileNet model achieved accurate classification of familiar, everyday objects and landscapes when clear, high-contrast images were provided.  
It was notable that even a partial view, such as a fragment of a tandem bicycle, resulted in a correct classification despite potential ambiguity.  
However, difficulties arose when handling abstract, artistic representations or when objects had high visual similarity to others (e.g., the Laika dog breed, often misclassified as other breeds or wolves).  
Similarly, famous landmarks like the Eiffel Tower were not reliably recognized, particularly when depicted through mosaic or artistic styles.  
This highlights both the strengths and the current limitations of machine learning models when handling real-world, diverse image content.

---

## 📷 Screenshots (Optional)

![image](https://github.com/user-attachments/assets/bc56f8cd-baca-45d4-84ea-3f03a9a2ab47)

![image](https://github.com/user-attachments/assets/4648793c-da70-4a9e-bce5-6b9c8a305326)

![image](https://github.com/user-attachments/assets/97cc697a-59f7-4661-95b3-806f15205aa7)


---

## 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## 👨‍💻 Author

Developed by **kokr1011** — based on ml5.js, p5.js, and Chart.js libraries, designed according to Material Design principles.
