# Motion AI Learning

A lightweight computer vision project for real-time motion and posture detection using **MediaPipe**.

---

## 📌 Overview

Motion AI Learning is a frontend-based AI project that uses **MediaPipe Pose** to detect and analyze human body posture in real time through a webcam. The goal is to experiment with pose estimation and movement tracking without using heavy machine learning frameworks like TensorFlow.

---

## 🚀 Features

* Real-time pose detection using webcam
* Body landmark tracking (shoulders, neck, torso, etc.)
* Posture analysis logic (custom rules)
* Visual feedback using canvas overlay
* Lightweight and runs directly in the browser

---

## 🧠 Tech Stack

* JavaScript (ES6+)
* React 
* MediaPipe (Pose Detection)
* HTML5 Canvas API
* WebRTC (for webcam access)
* TailwindCSS

---

## ⚙️ How It Works

1. Accesses webcam using browser API
2. MediaPipe processes video frames
3. Detects body landmarks in real time
4. Custom logic evaluates posture alignment
5. Results are drawn on canvas overlay

---

## ▶️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/motion-ai-learning.git
cd motion-ai-learning
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the project

```bash
npm run dev
```

---

## 🧩 Key Concept

Instead of training a model, this project uses **pre-trained MediaPipe models** to extract pose landmarks, then applies custom logic to analyze posture.

---

## 💡 Future Improvements

* Add exercise detection (squats, push-ups)
* Store posture history
* Add AI-based correction suggestions
* Mobile support

---

## 👩‍💻 Author

Built by Simav Adnan Mohamed & Liloz Shible

---

## ⭐️ Support

If you like this project, give it a ⭐ on GitHub!
