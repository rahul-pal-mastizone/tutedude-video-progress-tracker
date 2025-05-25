# Tutedude Video Progress Tracker

This project was built to solve a real problem in online learning: just finishing a video doesn’t mean the learner actually watched it. The goal here is to track **real video engagement** by counting only the parts that have been uniquely watched — not skipped or repeated.

## 🎯 Features

- ✅ **Smart progress tracking**  
  Counts only new, unseen sections of the video.

- 🔁 **Skips and replays handled**  
  Skipping forward doesn’t count, and rewatching a segment won’t increase progress.

- 💾 **Persistent progress**  
  Stores your progress so you can continue from where you left off.

- 📊 **Visual timeline**  
  A green bar highlights the sections of the video you've truly completed.

- 🔁 **Reset anytime**  
  One click clears all saved progress and starts fresh.

---

## 🧠 How It Works

### Unique Interval Tracking

- When the video plays, the tool starts recording the interval.
- If the video is paused or skipped, it finalizes the watched segment.
- Overlapping or repeated time ranges are merged.
- Only unique watched seconds are used to calculate progress.

### Skip Prevention

Fast-forwarding doesn’t contribute to progress unless the user actually watches that segment.

### Resume Logic

Progress is saved in `localStorage`, so even if the page is refreshed or reopened later, it resumes cleanly.

---

## 🛠️ Built With

- HTML5
- CSS (custom styling)
- JavaScript (Vanilla)
- `localStorage` for saving progress
- Git + GitHub for version control

---

## 🔗 Live Demo

➡️ [Click to View the Live Project](https://rahul-pal-mastizone.github.io/tutedude-video-progress-tracker/)

---

## 🗂 Folder Structure

/tutedude-video-progress-tracker/
├── index.html
├── styles.css
├── main.js
├── tracker.js
├── sample-video.mp4
└── README.md

---

## 📩 Submission-Ready

- GitHub Repo: https://github.com/rahul-pal-mastizone/tutedude-video-progress-tracker  
- Live Project: https://rahul-pal-mastizone.github.io/tutedude-video-progress-tracker

Both are fully hosted, updated, and ready for evaluation.  
Made with ❤️ for the SDE assignment at Tutedude.

---

## 📃 License

Open-source, free to reuse with credit.
