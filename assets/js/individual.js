const FULL_NAME = "fullName";
const EMAIL = "email";
const PASSWORD = "password";
const TERMS_AND_CONDITION = "termsAndCondition";
const FORM_ID = "individual-form-step-1";
const INPUT_BORDER_RED_CLASS = "input-border-red";
const SWITCH_DEFAULT_MESSAGE = "Default";
const LOCAL_STORAGE_KEY = "step-2";
const NEXT_PAGE_LINK = "/complete-profile.html";
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
  FORM_ERROR_MESSAGE: "try submit form without filling",
};
const DEFAULT_MESSAGE = "default";
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
const fullName = document.getElementById(FULL_NAME);
const email = document.getElementById(EMAIL);
const password = document.getElementById(PASSWORD);
const termsAndCondition = document.getElementById(TERMS_AND_CONDITION);
const registerForm = document.getElementById(FORM_ID);

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
 * @param {object} inputFieldObj *this object error ,message ,errorTextId,targetInputName
 */

const isFieldHaveError = (inputFieldObj) => {
  const { isError, message, errorTextId, targetInputName } = inputFieldObj;
  const targetField = document.getElementById(targetInputName);
  if (isError) {
    document.getElementById(errorTextId).innerHTML = message;
    targetField.classList.add(INPUT_BORDER_RED_CLASS);
    individualFormFieldValue[targetInputName].isValid = false;
  } else {
    document.getElementById(errorTextId).innerHTML = "";
    targetField.classList.remove(INPUT_BORDER_RED_CLASS);
    individualFormFieldValue[targetInputName].isValid = true;
  }
};
/**
 * checkFeildIsValid function called when change occured in any input
 * @param event *this event is passed through addEventListener function
 */
const checkFeildIsValid = (event) => {
  const { value } = individualFormFieldValue[event.target.name];
  switch (event.target.name) {
    case FULL_NAME:
      {
        if (!FULL_NAME_REGEX.test(value)) {
          isFieldHaveError({
            isError: true,
            message: ERROR_MESSAGE.FULL_NAME_MESSAGE.VALID,
            errorTextId: ERROR_TEXT_ID.FULL_NAME_TEXT_ID,
            targetInputName: event.target.name,
          });
          checkFormIsValid();
        } else if (value.length <= 3) {
          isFieldHaveError({
            isError: true,
            message: ERROR_MESSAGE.FULL_NAME_MESSAGE.MIN,
            errorTextId: ERROR_TEXT_ID.FULL_NAME_TEXT_ID,
            targetInputName: event.target.name,
          });
          checkFormIsValid();
        } else if (value.length >= 20) {
          isFieldHaveError({
            isError: true,
            message: ERROR_MESSAGE.FULL_NAME_MESSAGE.M,
            errorTextId: ERROR_TEXT_ID.FULL_NAME_TEXT_ID,
            targetInputName: event.target.name,
          });
          checkFormIsValid();
        } else {
          isFieldHaveError({
            isError: false,
            errorTextId: ERROR_TEXT_ID.FULL_NAME_TEXT_ID,
            targetInputName: event.target.name,
          });
          checkFormIsValid();
        }
      }
      break;
    case EMAIL:
      {
        if (!EMAIL_REGEX.test(value)) {
          isFieldHaveError({
            isError: true,
            message: ERROR_MESSAGE.EMAIL_MESSAGE.VALID,
            errorTextId: ERROR_TEXT_ID.EMAIL_TEXT_ID,
            targetInputName: event.target.name,
          });
          checkFormIsValid();
        } else {
          isFieldHaveError({
            isError: false,
            errorTextId: ERROR_TEXT_ID.EMAIL_TEXT_ID,
            targetInputName: event.target.name,
          });
        }
      }
      break;
    case PASSWORD:
      {
        if (value.length < 8) {
          isFieldHaveError({
            isError: true,
            errorTextId: ERROR_TEXT_ID.PASSWORD_TEXT_ID,
            message: ERROR_MESSAGE.PASSWORD_MESSAGE.VALID,
            targetInputName: event.target.name,
          });
          checkFormIsValid();
        } else {
          isFieldHaveError({
            isError: false,
            errorTextId: ERROR_TEXT_ID.PASSWORD_TEXT_ID,
            targetInputName: event.target.name,
          });
          checkFormIsValid();
        }
      }
      break;
    default:
      console.log(SWITCH_DEFAULT_MESSAGE);
  }
};
/**
 * changeHandler function called when change occured in any input
 * @param event *this event is passed through addEventListener function
 */
const changeHandler = (event) => {
  individualFormFieldValue[event.target.name].value = event.target.value;
};

/**
 * handleSubmitEvent will call when form in submitted
 * @param event *this event is passed through addEventListener function
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
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formValue));

    window.location.href = NEXT_PAGE_LINK;
  } else {
    console.log({ Error: ERROR_MESSAGE.FORM_ERROR_MESSAGE });

    if (individualFormFieldValue.fullName.value.length === 0) {
      isFieldHaveError({
        isError: true,
        message: ERROR_MESSAGE.FULL_NAME_MESSAGE.REQUIRED,
        errorTextId: ERROR_TEXT_ID.FULL_NAME_TEXT_ID,
        targetInputName: FULL_NAME,
      });
    }
    if (individualFormFieldValue.email.value.length === 0) {
      isFieldHaveError({
        isError: true,
        message: ERROR_MESSAGE.EMAIL_MESSAGE.REQUIRED,
        errorTextId: ERROR_TEXT_ID.EMAIL_TEXT_ID,
        targetInputName: EMAIL,
      });
    }
    if (individualFormFieldValue.fullName.value.length === 0) {
      isFieldHaveError({
        isError: true,
        message: ERROR_MESSAGE.PASSWORD_MESSAGE.REQUIRED,
        errorTextId: ERROR_TEXT_ID.PASSWORD_TEXT_ID,
        targetInputName: PASSWORD,
      });
    }
  }
};
/**
 * callback function (changeHandler and checkFeildIsValid) call when change and blur event call
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

registerForm.addEventListener("submit", handleSubmitEvent);
