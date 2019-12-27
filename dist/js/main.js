let navbar = document.querySelector('.mainNav');
let navToggler = navbar.querySelector('.nav-toggler');

window.addEventListener('scroll', () => {
  if (pageYOffset > navbar.clientHeight && navbar.className.includes('scrolled')) return;

  if (pageYOffset > navbar.clientHeight) {
    navbar.classList.add('scrolled');
    navToggler.classList.remove('d-none');
  } else {
    navbar.classList.remove('scrolled');
    navToggler.classList.add('d-none');
  }
});

navToggler.addEventListener('click', () => {
  navbar.classList.toggle('scrolled');
});

/* ======================================================================================================== */

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

function docReady(cb) {
  if (document.readyState !== 'loading') cb();
  else document.addEventListener('DOMContentLoaded', cb);
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

// Given a number data type, return the start padded string of it.
function padStartNumber(num, amount, char) {
  return String(num).padStart(amount, char);
}

function removeAllChild(parent) {
  while (parent.firstChild) parent.firstChild.remove();
}
