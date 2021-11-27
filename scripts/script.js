function validateForm() {
  let isValidate = true;

  let email = document.querySelector('#email');
  const emailRegexp = '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$';
  if (email.value.match(emailRegexp) || !email.value) {
    email.className="input-invalid";
    isValidate = false;
  } else {
    email.className="input-valid";
  }

  let postalCode = document.querySelector('#postal_code');
  const postalCodeRegexp = '\d{2}-\d{3}';
  if (postalCode.value.match(postalCodeRegexp) || !postalCode.value) {
    postalCode.className="input-invalid";
    isValidate = false;
  } else {
    postalCode.className="input-valid";
  }

  return false;
}