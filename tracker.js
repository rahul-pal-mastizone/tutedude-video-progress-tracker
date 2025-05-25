// tracker.js
// Stores and tracks unique watched intervals for a single video

export default class WatchTracker {
  constructor(videoId) {
    this.videoId = videoId;
    this.intervals = []; // [{start, end}]
    this.currentInterval = null;
    this.duration = 0;
    this.load();
  }

  setDuration(duration) {
    this.duration = Math.floor(duration);
  }

  startWatching(startTime) {
    const rounded = Math.floor(startTime);
    this.currentInterval = { start: rounded, end: rounded };
  }

  updateWatching(currentTime) {
    if (!this.currentInterval) return;
    const rounded = Math.floor(currentTime);
    if (rounded > this.currentInterval.end) {
      this.currentInterval.end = rounded;
    }
  }

  stopWatching() {
    if (!this.currentInterval) return;
    const { start, end } = this.currentInterval;
    if (end > start + 1) {
      this.intervals.push({ start, end });
      this.mergeIntervals();
      this.save();
    }
    this.currentInterval = null;
  }

  handleSeek(newTime) {
    // Break current tracking interval on seek
    this.stopWatching();
  }

  mergeIntervals() {
    if (this.intervals.length <= 1) return;

    this.intervals.sort((a, b) => a.start - b.start);
    const merged = [this.intervals[0]];

    for (let i = 1; i < this.intervals.length; i++) {
      const last = merged[merged.length - 1];
      const curr = this.intervals[i];

      if (curr.start <= last.end) {
        last.end = Math.max(last.end, curr.end);
      } else {
        merged.push(curr);
      }
    }

    this.intervals = merged;
  }

  getUniqueSeconds() {
    return this.intervals.reduce((sum, { start, end }) => sum + (end - start), 0);
  }

  getProgressPercent() {
    if (!this.duration) return 0;
    return Math.min(100, Math.round((this.getUniqueSeconds() / this.duration) * 100));
  }

  getLastWatched() {
    return this.intervals.length ? this.intervals[this.intervals.length - 1].end : 0;
  }

  drawTimeline(barEl) {
    barEl.innerHTML = '';
    for (const { start, end } of this.intervals) {
      const span = document.createElement('div');
      span.style.position = 'absolute';
      span.style.left = `${(start / this.duration) * 100}%`;
      span.style.width = `${((end - start) / this.duration) * 100}%`;
      span.style.height = '100%';
      span.style.backgroundColor = '#2ecc71';
      barEl.appendChild(span);
    }
  }

  save() {
    const data = {
      intervals: this.intervals,
      duration: this.duration
    };
    localStorage.setItem(`tracker-${this.videoId}`, JSON.stringify(data));
  }

  load() {
    const raw = localStorage.getItem(`tracker-${this.videoId}`);
    if (raw) {
      try {
        const data = JSON.parse(raw);
        this.intervals = data.intervals || [];
        this.duration = data.duration || 0;
        this.mergeIntervals();
      } catch {
        this.intervals = [];
      }
    }
  }

  resetProgress() {
    this.intervals = [];
    this.currentInterval = null;
    localStorage.removeItem(`tracker-${this.videoId}`);
  }
}  