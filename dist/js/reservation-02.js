function loadDatePackage() {
  let { time, servicePackage } = loadSessionStorage('reservation');
  let timeContainer = document.querySelector('.date-package .time span');
  let packageContainer = document.querySelector('.date-package .package span');
  let dateObj = new Date(time);
  let dateString = `${dateObj.toLocaleDateString()} - ${dateObj.getHours()}:00`;

  timeContainer.textContent = dateString;
  packageContainer.textContent = servicePackage;
}

function init() {
  let allInput = document.querySelectorAll('input');
  let previewBtn = document.querySelector('.button-preview');

  // Load date & package data from previous form page.
  loadDatePackage();

  // Save input data to storage every input change.
  for (const input of allInput) {
    input.addEventListener('change', () => {
      const { name, value } = input;
      saveInputToStorage(name, value);
    });
  }

  // Checking if all inputs are filled.
  previewBtn.addEventListener('click', event => {
    if (Array.from(allInput).some(input => input.value == '')) {
      event.preventDefault();
      alert('Please fill all of the required inputs.');
    }
  });
}

docReady(init);
