let timeData;
let timeTable = document.querySelector('.time-timetable');
let cardsContainer = document.querySelector('.cards');

function init() {
  let datePickerInputField = document.querySelector('.datePicker-inputField input');
  let datePickerSelectBtn = document.querySelector('.datePicker-selectBtn');
  let cards = cardsContainer.querySelectorAll('input');
  let nextBtn = document.querySelector('.action-buttons a');

  datePickerSelectBtn.addEventListener('click', () => {
    if (!datePickerInputField.value) {
      datePickerInputField.reportValidity();
      return;
    }
    generateTimeTable(datePickerInputField.value);
  });

  timeTable.addEventListener('click', event => {
    if (event.target.tagName !== 'BUTTON') return;
    let timestamp = event.target.closest('.timestamp');
    timestamp.click();
  });

  cardsContainer.addEventListener('click', event => {
    if (event.target.tagName !== 'BUTTON') return;
    let card = event.target.closest('.card');
    card.click();
  });

  for (const card of cards) {
    card.addEventListener('change', () => {
      saveInputToStorage('servicePackage', card.value);
    });
  }

  nextBtn.addEventListener('click', event => {
    let timeStamps = Array.from(document.querySelectorAll('input[name="timestamp"]'));
    let packages = Array.from(document.querySelectorAll('input[name="servicePackage"]'));
    let isChecked = inputArray => {
      return inputArray.some(input => input.checked);
    };

    if (!isChecked(timeStamps) || !isChecked(packages)) {
      event.preventDefault();
      alert('Please fill all of the required inputs.');
    }
  });
}

docReady(init);

/* ======================================================================================================== */

function generateTimeTable(dateString) {
  removeAllChild(timeTable);
  retrieveJSON(`data/${dateString}.json`).then(data => {
    timeData = data;
    for (const { time, isReserved } of timeData) {
      let date = new Date(time);
      let dom = elt(
        'label',
        null,
        elt('input', {
          type: 'radio',
          name: 'timestamp',
          value: time,
          disabled: isReserved,
          required: true,
          onchange: timeStampChange
        }),
        elt(
          'div',
          {
            className: isReserved ? 'timestamp reserved' : 'timestamp'
          },
          elt(
            'div',
            { className: 'timestamp-date' },
            `${date.getMonth() + 1}/${padStartNumber(date.getDate(), 2, '0')}/${date.getFullYear()}`
          ),
          elt(
            'div',
            { className: 'timestamp-hour' },
            `${padStartNumber(date.getHours(), 2, '0')}:00`
          ),
          elt('div', { className: 'timestamp-select' }, elt('button', null, 'Select'))
        )
      );
      timeTable.appendChild(dom);
    }
  });
}

function timeStampChange(event) {
  let timeStampInputs = document.querySelectorAll('input[name="timestamp"]');
  let input = event.target;
  let inputIndex = Array.from(timeStampInputs).indexOf(input);
  let twoTimeStamp = timeData.slice(inputIndex, inputIndex + 2);

  // Save chosen timestamp to session storage.
  saveInputToStorage('time', input.value);

  // Toggle services availablity.
  if (twoTimeStamp.some(t => t.isReserved) || twoTimeStamp.length < 2) {
    for (let i = 1; i < cardsContainer.children.length; i++) {
      cardsContainer.children[i].classList.add('hide');
    }
  } else {
    for (let i = 1; i < cardsContainer.children.length; i++) {
      cardsContainer.children[i].classList.remove('hide');
    }
  }
  // Reset input's checked status.
  for (const cardInput of cardsContainer.querySelectorAll('input')) {
    cardInput.checked = false;
  }
}

/* ======================================================================================================== */

// SANDBOX

// let dateInput = document.querySelector('input[type="date"]');

// dateInput.addEventListener('change', () => {
//   console.log(dateInput.value);
//   // let dateParts = dateInput.value.split('-').map(data => Number(data));
//   // let dateObj = new Date(...dateParts);
//   // console.log(dateObj.getTime());
// });

// /* ======================================================================================================== */

// let timeStampInput = document.querySelectorAll('input[name="timestamp"]');
// for (const timestamp of timeStampInput) {
//   timestamp.addEventListener('change', () => {
//     console.log('changed');
//   });
// }

// // retrieveJSON('data/2019-12-01.json').then(data => {
// //   console.log(data.map(({ time }) => new Date(time).getTime()));
// // });

// let timeTable = document.querySelector('.time-timetable');
// timeTable.addEventListener('click', event => {
//   if (event.target.tagName !== 'BUTTON') return;
//   let selectBtn = event.target;
//   selectBtn.closest('.timestamp').click();
// });
