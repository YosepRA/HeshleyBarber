let timeData;
let datePickerInputField = document.querySelector('.datePicker-inputField input');
let datePickerSelectBtn = document.querySelector('.datePicker-selectBtn');
let timeTable = document.querySelector('.time-timetable');
let cards = document.querySelectorAll('.cards label');

datePickerSelectBtn.addEventListener('click', () => {
  if (!datePickerInputField.value) {
    datePickerInputField.reportValidity();
    return;
  }
  generateTimeTable(datePickerInputField.value);
});

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
          onchange: toggleService
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

function toggleService(event) {
  let timeStampInputs = document.querySelectorAll('input[name="timestamp"]');
  let input = event.target;
  let inputIndex = Array.from(timeStampInputs).indexOf(input);
  let twoTimeStamp = timeData.slice(inputIndex, inputIndex + 2);

  if (twoTimeStamp.some(t => t.isReserved) || twoTimeStamp.length < 2) {
    for (let i = 1; i < cards.length; i++) {
      cards[i].style.display = 'none';
    }
  } else {
    for (let i = 1; i < cards.length; i++) {
      cards[i].style.display = '';
    }
  }
}

// number → string
function padStartNumber(num, amount, char) {
  return String(num).padStart(amount, char);
}

function removeAllChild(parent) {
  while (parent.firstChild) parent.firstChild.remove();
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
