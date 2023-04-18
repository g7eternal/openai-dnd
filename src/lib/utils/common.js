export function shuffle(arr = []) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

export function sample(arr = []) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export function sampleSize(arr = [], howMany = 0) {
  const indices = shuffle(arr.map((el, ix) => ix));
  return indices.slice(-howMany).map((ix) => arr[ix]);
}

export function sampleValue(obj = {}) {
  return sample(Object.values(obj));
}

export function asyncPause(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export function escapeHTML(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
