const logo = document.querySelector("#logo");
logo.addEventListener("click", () => (window.location.href = "/"));

const moveToStep2 = () => {
  window.location.href = "/complete-profile.html";
};
const handleSubmitEvent = (e) => {
  e.preventDefault();
  if (individualFormFieldValue.formIsValid) {
    const individualObj = {
      fullName: individualFormFieldValue.fullName.value,
      email: individualFormFieldValue.email.value,
      password: individualFormFieldValue.password.value,
      termsAndCondition: individualFormFieldValue.termsAndCondition.value,
    };
    console.log(individualObj);
  } else {
    if (individualFormFieldValue.fullName.value.length === 0) {
      document.querySelector("#fullName-error-text").innerHTML =
        "fullName is Reqired";
      fullName.classList.add("error");
    }
    if (individualFormFieldValue.email.value.length === 0) {
      document.querySelector("#email-error-text").innerHTML =
        "Email is required";
      email.classList.add("error");
    }
    if (individualFormFieldValue.password.value.length === 0) {
      document.querySelector("#password-error-text").innerHTML =
        "Password is required";
      password.classList.add("error");
    }
  }
};
const checkFormIsValid = () => {
  const isFullNameValid = individualFormFieldValue.fullName.isValid;
  const isEmailValid = individualFormFieldValue.email.isValid;
  const isPasswordValid = individualFormFieldValue.password.isValid;
  const isTermsAndConditionValid =
    individualFormFieldValue.termsAndCondition.isValid;
  const submitBtn = document.querySelector("#submit-btn");
  if (
    isFullNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isTermsAndConditionValid
  ) {
    individualFormFieldValue = {
      ...individualFormFieldValue,
      formIsValid: true,
    };
    submitBtn.disabled = false;
    submitBtn.classList.add("submit-button");
    submitBtn.classList.remove("submit-button-disabled");
  } else {
    individualFormFieldValue = {
      ...individualFormFieldValue,
      formIsValid: false,
    };
    submitBtn.disabled = true;
    submitBtn.classList.add("submit-button-disabled");
    submitBtn.classList.remove("submit-button");
  }
};
const register = document.querySelector("#individual-form-step-1");
register.addEventListener("submit", (e) => handleSubmitEvent(e));

let individualFormFieldValue = {
  fullName: { value: "", isValid: false },
  email: { value: "", isValid: false },
  password: { value: "", isValid: false },
  termsAndCondition: { value: false, isValid: false },
  formIsValid: false,
};

const changeHandler = (event) => {
  individualFormFieldValue = {
    ...individualFormFieldValue,
    [event.target.name]: { value: event.target.value, isValid: false },
  };
};

const FieldsIsValid = () => {};

const fullName = document.querySelector("#fullName");
fullName.addEventListener("change", changeHandler);
fullName.addEventListener("blur", (event) => {
  const { value } = individualFormFieldValue.fullName;
  const regEx = /^\*?[A-Za-z]+$/;
  console.log(regEx.test(value));
  if (value.length === 0) {
    document.querySelector("#fullName-error-text").innerHTML =
      "fullName is Reqired";
    individualFormFieldValue = {
      ...individualFormFieldValue,
      [event.target.name]: { value, isValid: false },
    };
    fullName.classList.add("error");
  } else if (!regEx.test(value)) {
    document.querySelector("#fullName-error-text").innerHTML =
      "please enter Valid Name";
    individualFormFieldValue = {
      ...individualFormFieldValue,
      [event.target.name]: { value, isValid: false },
    };
  } else if (value.length < 3) {
    document.querySelector("#fullName-error-text").innerHTML =
      "name should be greater than 2";
    individualFormFieldValue = {
      ...individualFormFieldValue,
      [event.target.name]: { value, isValid: false },
    };
    fullName.classList.add("error");
  } else if (value.length > 20) {
    document.querySelector("#fullName-error-text").innerHTML =
      "name should be smaller than 20";
    individualFormFieldValue = {
      ...individualFormFieldValue,
      [event.target.name]: { value, isValid: false },
    };
    fullName.classList.add("error");
  } else {
    document.querySelector("#fullName-error-text").innerHTML = "";
    individualFormFieldValue = {
      ...individualFormFieldValue,
      [event.target.name]: { value, isValid: true },
    };
    fullName.classList.remove("error");
    checkFormIsValid();
  }
});

const email = document.querySelector("#email");
email.addEventListener("change", changeHandler);
email.addEventListener("blur", (event) => {
  const regEx = /^\S+@+\S+.+\S+$/;
  const { value } = individualFormFieldValue.email;
  if (value.length === 0) {
    document.querySelector("#email-error-text").innerHTML = "Email is required";
    email.classList.add("error");
  } else if (!regEx.test(value)) {
    document.querySelector("#email-error-text").innerHTML =
      "enter valid email address";
    individualFormFieldValue = {
      ...individualFormFieldValue,
      [event.target.name]: { value, isValid: false },
    };
    email.classList.add("error");
  } else {
    document.querySelector("#email-error-text").innerHTML = "";
    individualFormFieldValue = {
      ...individualFormFieldValue,
      [event.target.name]: { value, isValid: true },
    };
    email.classList.remove("error");
    checkFormIsValid();
  }
});

const password = document.querySelector("#password");
password.addEventListener("change", changeHandler);
password.addEventListener("blur", (event) => {
  const { value } = individualFormFieldValue.password;
  if (value.length === 0) {
    document.querySelector("#password-error-text").innerHTML =
      "Password is required";
    password.classList.add("error");
  } else if (value.length < 8) {
    document.querySelector("#password-error-text").innerHTML =
      "enter a strong password";
    individualFormFieldValue = {
      ...individualFormFieldValue,
      [event.target.name]: { value, isValid: false },
    };
    password.classList.add("error");
  } else {
    document.querySelector("#password-error-text").innerHTML = "";
    individualFormFieldValue = {
      ...individualFormFieldValue,
      [event.target.name]: { value, isValid: true },
    };
    password.classList.remove("error");
    checkFormIsValid();
  }
});

const termsAndCondition = document.querySelector("#termsAndCondition");
termsAndCondition.addEventListener("change", (event) => {
  individualFormFieldValue = {
    ...individualFormFieldValue,
    [event.target.name]: {
      value: event.target.checked,
      isValid: event.target.checked,
    },
  };
  checkFormIsValid();
});
