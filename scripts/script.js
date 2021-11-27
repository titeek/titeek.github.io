function validateForm() {
  let isValidate = true;

  let email = document.querySelector('#email');
  const emailRegexp = '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$';
  if (!email.value.match(emailRegexp) || !email.value) {
    email.className="input-invalid";
    isValidate = false;
  } else {
    email.className="input-valid";
  }

  let postalCode = document.querySelector('#postal_code');
  const postalCodeRegexp = new RegExp('[0-9]{2}[-][0-9]{3}');
  if (!postalCode.value.match(postalCodeRegexp) || !postalCode.value) {
    postalCode.className="input-invalid";
    isValidate = false;
  } else {
    postalCode.className="input-valid";
  }

  let nip = document.querySelector('#nip');
  const nipRegexp = new RegExp('[0-9]{3}[-][0-9]{2}[-][0-9]{2}[-][0-9]{3}');
  if (!nip.value.match(nipRegexp) || !nip.value) {
    nip.className="input-invalid";
    isValidate = false;
  } else {
    nip.className="input-valid";
  }

  let cardId = document.querySelector('#card_id');
  const cardIdRegexp = new RegExp('[A-Za-z]{3} [0-9]{6}');
  if (!cardId.value.match(cardIdRegexp) || !cardId.value) {
    cardId.className="input-invalid";
    isValidate = false;
  } else {
    cardId.className="input-valid";
  }

  return false;
}