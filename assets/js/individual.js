const FORM_IS_VALID = "formIsValid";
const FULL_NAME_REGEX = /^[A-Za-z ]{3,20}$/;
const EMAIL_REGEX = /^\S+@+\S+.+\S+$/;
const ERROR_TEXT_ID = {
  EMAIL_TEXT_ID: "email-error-text",
  FULL_NAME_TEXT_ID: "fullName-error-text",
  PASSWORD_TEXT_ID: "password-error-text",
};
const ERROR_MESSAGE = {
  FULL_NAME_MESSAGE: {
    REQUIRED: "Please enter Name",
    MIN: "Name should have atleast 3 character",
    MAX: "Name should have atmost 20 character",
    VALID: "Please enter Valid Name",
  },
  EMAIL_MESSAGE: {
    VALID: "Please enter valid Email",
    REQUIRED: "Please enter Email",
  },

  PASSWORD_MESSAGE: {
    REQUIRED: "Password is required",
    VALID: "Please enter a strong Password",
  },
};
/**
 * individualFormFieldValue is a object that stores the value of each field and also indicates each feild is valid or form is valid or not
 */
let individualFormFieldValue = {
  fullName: { value: "", isValid: false },
  email: { value: "", isValid: false },
  password: { value: "", isValid: false },
  termsAndCondition: { value: false, isValid: false },
  formIsValid: false,
};
/**
 * declare all variable which initailize the element selected by getElementById
 */
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const termsAndCondition = document.getElementById("termsAndCondition");
const registerForm = document.getElementById("individual-form-step-1");

/**
 * checkFormIsValid checks the all feild is valid so form is valid
 */
const checkFormIsValid = () => {
  let count = 0;
  const arrayOfKeys = Object.keys(individualFormFieldValue);
  const totalFeilds = arrayOfKeys.length - 1;
  arrayOfKeys.forEach((element) => {
    if (
      individualFormFieldValue[element] !== FORM_IS_VALID &&
      individualFormFieldValue[element].isValid
    )
      ++count;
  });
  if (count === totalFeilds) {
    individualFormFieldValue.formIsValid = true;
  } else {
    individualFormFieldValue.formIsValid = false;
  }
};

/**
 * isFieldHaveError function if input field have error so return error or otherwise set Feild is valid
 * @param {*this object error ,message ,errorTextId,targetInputName} inputFieldObj
 */

const isFieldHaveError = (inputFieldObj) => {
  const { isError, message, errorTextId, targetInputName } = inputFieldObj;
  const targetField = document.getElementById(targetInputName);
  if (isError) {
    document.getElementById(errorTextId).innerHTML = message;
    targetField.classList.add("input-border-red");
    individualFormFieldValue[targetInputName].isValid = false;
  } else {
    document.getElementById(errorTextId).innerHTML = "";
    targetField.classList.remove("input-border-red");
    individualFormFieldValue[targetInputName].isValid = true;
  }
  checkFormIsValid();
};
/**
 * checkFeildIsValid function called when change occured in any input
 * @param {*this event is passed through addEventListener function } event
 */
const checkFeildIsValid = (event) => {
  const { value } = individualFormFieldValue[event.target.name];
  switch (event.target.name) {
    case "fullName":
      {
        if (!FULL_NAME_REGEX.test(value)) {
          isFieldHaveError({
            isError: true,
            message: ERROR_MESSAGE.FULL_NAME_MESSAGE.VALID,
            errorTextId: ERROR_TEXT_ID.FULL_NAME_TEXT_ID,
            targetInputName: event.target.name,
          });
        } else if (value.length <= 3) {
          isFieldHaveError({
            isError: true,
            message: ERROR_MESSAGE.FULL_NAME_MESSAGE.MIN,
            errorTextId: ERROR_TEXT_ID.FULL_NAME_TEXT_ID,
            targetInputName: event.target.name,
          });
        } else if (value.length >= 20) {
          isFieldHaveError({
            isError: true,
            message: ERROR_MESSAGE.FULL_NAME_MESSAGE.M,
            errorTextId: ERROR_TEXT_ID.FULL_NAME_TEXT_ID,
            targetInputName: event.target.name,
          });
        } else {
          isFieldHaveError({
            isError: false,
            errorTextId: ERROR_TEXT_ID.FULL_NAME_TEXT_ID,
            targetInputName: event.target.name,
          });
        }
      }
      break;
    case "email":
      {
        if (!EMAIL_REGEX.test(value)) {
          isFieldHaveError({
            isError: true,
            message: ERROR_MESSAGE.EMAIL_MESSAGE.VALID,
            errorTextId: ERROR_TEXT_ID.EMAIL_TEXT_ID,
            targetInputName: event.target.name,
          });
        } else {
          isFieldHaveError({
            isError: false,
            errorTextId: ERROR_TEXT_ID.EMAIL_TEXT_ID,
            targetInputName: event.target.name,
          });
        }
      }
      break;
    case "password":
      {
        if (value.length < 8) {
          isFieldHaveError({
            isError: true,
            errorTextId: ERROR_TEXT_ID.PASSWORD_TEXT_ID,
            message: ERROR_MESSAGE.PASSWORD_MESSAGE.VALID,
            targetInputName: event.target.name,
          });
        } else {
          isFieldHaveError({
            isError: false,
            errorTextId: ERROR_TEXT_ID.PASSWORD_TEXT_ID,
            targetInputName: event.target.name,
          });
        }
      }
      break;
    default:
      console.log("default");
  }
};
/**
 * changeHandler function called when change occured in any input
 * @param {*this event is passed through addEventListener function } event
 */
const changeHandler = (event) => {
  individualFormFieldValue[event.target.name].value = event.target.value;

  const { value } = individualFormFieldValue[event.target.name];
  switch (event.target.name) {
    case "fullName":
      {
        if (value.length === 0) {
          isFieldHaveError({
            isError: true,
            message: ERROR_MESSAGE.FULL_NAME_MESSAGE.REQUIRED,
            errorTextId: ERROR_TEXT_ID.FULL_NAME_TEXT_ID,
            targetInputName: event.target.name,
          });
        }
      }
      break;
    case "email":
      {
        if (value.length === 0) {
          isFieldHaveError({
            isError: true,
            message: ERROR_MESSAGE.EMAIL_MESSAGE.REQUIRED,
            errorTextId: ERROR_TEXT_ID.EMAIL_TEXT_ID,
            targetInputName: event.target.name,
          });
        }
      }
      break;
    case "password":
      {
        if (value.length === 0) {
          isFieldHaveError({
            isError: true,
            message: ERROR_MESSAGE.PASSWORD_MESSAGE.REQUIRED,
            errorTextId: ERROR_TEXT_ID.PASSWORD_TEXT_ID,
            targetInputName: event.target.name,
          });
        }
      }
      break;
    default:
      console.log("default");
  }
};

/**
 * handleSubmitEvent will call when form in submitted
 * @param {*this event is passed through addEventListener function} event
 */
const handleSubmitEvent = (event) => {
  event.preventDefault();
  const { formIsValid, fullName, email, password, termsAndCondition } =
    individualFormFieldValue;
  if (formIsValid) {
    const formValue = {
      fullName: fullName.value,
      email: email.value,
      password: password.value,
      termsAndCondition: termsAndCondition.value,
    };
    console.log(formValue);
    localStorage.setItem("step-2", JSON.stringify(formValue));

    window.location.href = "/complete-profile.html";
  } else {
    console.log("error : try submit form without filling");
  }
};
/**
 * callback function call when change and blur event call
 */
fullName.addEventListener("change", changeHandler);
fullName.addEventListener("blur", checkFeildIsValid);

email.addEventListener("change", changeHandler);
email.addEventListener("blur", checkFeildIsValid);

password.addEventListener("change", changeHandler);
password.addEventListener("blur", checkFeildIsValid);

termsAndCondition.addEventListener("change", (event) => {
  individualFormFieldValue[event.target.name].value = event.target.checked;
  individualFormFieldValue[event.target.name].isValid = event.target.checked;
  checkFormIsValid();
});

registerForm.addEventListener("submit", (e) => handleSubmitEvent(e));
