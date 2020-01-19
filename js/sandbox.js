// fetch('index.html')
//   .then(res => res.text())
//   .then(data => {
//     let parser = new DOMParser();
//     let doc = parser.parseFromString(data, 'text/html');
//     console.dir(doc.querySelector('.header-subheader'));
//   });

/* ======================================================================================================== */

// let previewBtn = document.querySelector('.button-preview');

// previewBtn.addEventListener('click', e => {
//   console.log('Clicked');
//   e.preventDefault();
// });

/* ======================================================================================================== */

// function isValidPassword(password, username) {
//   if (
//     password.length >= 8 &&
//     password == password.trim() &&
//     password !== password.includes(username)
//   ) {
//     return true;
//   }

//   return false;
// }

// function isValidPassword(password, username) {
//   return password.length >= 8 && /\s/.test(password) && password.includes(username);
// }
