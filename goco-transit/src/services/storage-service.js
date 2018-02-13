
// On server-side apps, sometimes local storage takes a moment to become defined
// We need to make sure we don't try to use it in that time
function storageIsDefined() {
  let isDefined = false;
  if (typeof window !== 'undefined') {
    isDefined = true;
  }
  return isDefined;
}

// Get an item from local storage
function getItem(key) {
  let item = null;
  if (storageIsDefined()) {
    item = window.localStorage.getItem(key);
  }
  return item;
}

// Put an item into local storage
function setItem(key, value) {
  if (storageIsDefined()) {
    window.localStorage.setItem(key, value);
  }
}

// Delete an item from local storage
function removeItem(key) {
  if (storageIsDefined()) {
    window.localStorage.removeItem(key);
  }
}

export { getItem, setItem, removeItem };