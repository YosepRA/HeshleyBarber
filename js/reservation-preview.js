const reservationData = loadSessionStorage('reservation');

function loadDatePackage() {
  let { time, servicePackage } = reservationData;
  let timeContainer = document.querySelector('.date-package .time span');
  let packageContainer = document.querySelector('.date-package .package span');
  let date = new Date(time);
  let dateString = `${date.toLocaleDateString()} - ${date.getHours()}:00`;

  timeContainer.textContent = dateString;
  packageContainer.textContent = servicePackage;
}

function loadPersonalInfo() {
  let nameContainer = document.querySelector('.personal-info .personal-name span');
  let idContainer = document.querySelector('.personal-info .personal-id span');

  nameContainer.textContent = reservationData['personal-name'];
  idContainer.textContent = reservationData['personal-id'];
}

function loadPaymentInfo() {
  let nameContainer = document.querySelector('.payment-info .payment-name span');
  let expDateContainer = document.querySelector('.payment-info .payment-expDate span');
  let securityCodeContainer = document.querySelector('.payment-info .payment-securityCode span');
  let cardNumberContainer = document.querySelector('.payment-info .payment-cardNumber span');
  let securityCode = reservationData['payment-securityCode'];
  let cardNumber = reservationData['payment-cardNumber'];

  nameContainer.textContent = reservationData['payment-name'];
  expDateContainer.textContent = reservationData['payment-expDate'];
  securityCodeContainer.textContent = securityCode
    .slice(securityCode.length - 1)
    .padStart(securityCode.length, '*');
  cardNumberContainer.textContent = cardNumber
    .slice(cardNumber.length - 4)
    .padStart(cardNumber.length, '*');
}

function init() {
  let submitBtn = document.querySelector('.reservation-submit');

  // Date & Package
  loadDatePackage();
  // Personal info
  loadPersonalInfo();
  // Payment info
  loadPaymentInfo();

  // Button to submit
  submitBtn.addEventListener('click', () => {
    notImplementedAlert('Reservation Submit');
  });
}

docReady(init);
