function elt(type, props, ...children) {
  let dom = document.createElement(type);
  if (props) Object.assign(dom, props);

  for (const child of children) {
    if (typeof child !== 'string') dom.appendChild(child);
    else dom.appendChild(document.createTextNode(child));
  }
  return dom;
}

// LOCAL STORAGE
// Local storage save.
function saveLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  return 'Data saved.';
}

// Local storage load.
function loadLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Remove all from storage.
function removeLocalStorage(key) {
  localStorage.removeItem(key);
  return 'Data removed.';
}

// SESSION STORAGE
// Session storage save.
function saveSessionStorage(key, data) {
  sessionStorage.setItem(key, JSON.stringify(data));
  return 'Data saved.';
}

// Local storage load.
function loadSessionStorage(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

// Remove all from storage.
function removeSessionStorage(key) {
  sessionStorage.removeItem(key);
  return 'Data removed.';
}

function saveInputToStorage(key, value) {
  let retrievedData = loadSessionStorage('reservation') || {};
  saveSessionStorage('reservation', Object.assign(retrievedData, { [key]: value }));
}

// Fetching and parsing as JSON object.
async function retrieveJSON(path) {
  return await fetch(path)
    .then(res => res.json())
    .catch(err => {
      throw err;
    });
}

function notImplementedAlert(name) {
  alert(`I'm sorry. '${name}' functionality hasn't been implemented.`);
}
