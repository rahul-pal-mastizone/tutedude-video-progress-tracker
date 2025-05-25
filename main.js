// main.js
import WatchTracker from './tracker.js';

const video = document.getElementById('lectureVideo');
const percentEl = document.getElementById('progressPercent');
const timeEl = document.getElementById('uniqueTime');
const durationEl = document.getElementById('totalDuration');
const currentTimeEl = document.getElementById('currentTime');
const timeline = document.getElementById('watchedTimeline');
const resetBtn = document.getElementById('resetBtn');

const tracker = new WatchTracker('lecture-1');
let isSeeking = false;

function updateUI() {
  percentEl.textContent = tracker.getProgressPercent() + '%';
  timeEl.textContent = tracker.getUniqueSeconds() + 's';
  tracker.drawTimeline(timeline);
}

function updateLiveStats() {
  currentTimeEl.textContent = Math.floor(video.currentTime) + 's';
  if (!video.paused && !video.ended && !isSeeking) {
    tracker.updateWatching(video.currentTime);
    updateUI();
    requestAnimationFrame(updateLiveStats);
  }
}

video.addEventListener('loadedmetadata', () => {
  const duration = Math.floor(video.duration);
  tracker.setDuration(duration);
  durationEl.textContent = duration + 's';

  const lastTime = tracker.getLastWatched();
  if (lastTime && lastTime < duration - 5) {
    video.currentTime = lastTime;
  }

  updateUI();
});

video.addEventListener('play', () => {
  tracker.startWatching(video.currentTime);
  requestAnimationFrame(updateLiveStats);
});

video.addEventListener('pause', () => {
  tracker.stopWatching();
  updateUI();
});

video.addEventListener('ended', () => {
  tracker.stopWatching();
  updateUI();
});

video.addEventListener('seeking', () => {
  isSeeking = true;
  tracker.handleSeek(video.currentTime);
});

video.addEventListener('seeked', () => {
  isSeeking = false;
  if (!video.paused) {
    tracker.startWatching(video.currentTime);
  }
});

resetBtn.addEventListener('click', () => {
  if (confirm('Reset your progress?')) {
    tracker.resetProgress();
    video.currentTime = 0;
    updateUI();
    percentEl.textContent = '0%';
    timeEl.textContent = '0s';
    timeline.innerHTML = '';
  }
});
