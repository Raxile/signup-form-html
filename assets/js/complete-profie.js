const PHONE_CODE = "phoneCode";
const ADDRESS = "address";
const PHONE_NUMBER = "phoneNumber";
const COUNTRY = "country";
const FORM_ID = "completeProfile";
const PHONE_CLASS = "phone";
const FORM_IS_VALID = "formIsValid";
const NEXT_PAGE_LINK = "/complete-profile-2.html";
const INPUT_BORDER_RED_CLASS = "input-border-red";
const LOCAL_STORAGE_KEY = "step-3";
const ERROR_TEXT_ID = {
  ADDRESS_TEXT_ID: "address-error-text",
  COUNTRY_TEXT_ID: "country-error-text",
  PHONE_TEXT_ID: "phone-error-text",
};
const ERROR_MESSAGE = {
  COUNTRY_MESSAGE: "Select a country",
  ADDRESS_MESSAGE: {
    MIN: "address should have atleast 3 character",
    REQUIRED: "Address is required",
  },

  PHONE_NUMBER_MESSAGE: {
    REQUIRED: "Phone number is required",
    VALID: "Enter valid Phone number",
  },
  FORM_ERROR_MESSAGE: "try submit form without filling",
};
const DEFAULT_MESSAGE = "default";

/**
 * individualFormFieldValue is a object that stores the value of each field and also indicates each feild is valid or form is valid or not
 */
let individualFormFieldValue = {
  phoneCode: { value: "", isValid: false },
  phoneNumber: { value: "", isValid: false },
  address: { value: "", isValid: false },
  country: { value: "", isValid: false },
  formIsValid: false,
};
/**
 * declare all variable which initailize the element selected by getElementById
 */
const phoneCode = document.getElementById(PHONE_CODE);
const address = document.getElementById(ADDRESS);
const phoneNumber = document.getElementById(PHONE_NUMBER);
const country = document.getElementById(COUNTRY);
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
  const targetFeild = document.getElementById(targetInputName);
  if (isError) {
    document.getElementById(errorTextId).innerHTML = message;
    targetFeild.classList.add(INPUT_BORDER_RED_CLASS);
    individualFormFieldValue[targetInputName].isValid = false;
  } else {
    document.getElementById(errorTextId).innerHTML = "";
    targetFeild.classList.remove(INPUT_BORDER_RED_CLASS);
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
    case ADDRESS:
      {
        if (value.length <= 3) {
          isFieldHaveError({
            isError: true,
            message: ERROR_MESSAGE.ADDRESS_MESSAGE.MIN,
            errorTextId: ERROR_TEXT_ID.ADDRESS_TEXT_ID,
            targetInputName: event.target.name,
          });
          checkFormIsValid();
        } else {
          isFieldHaveError({
            isError: false,
            errorTextId: ERROR_TEXT_ID.ADDRESS_TEXT_ID,
            targetInputName: event.target.name,
          });
          checkFormIsValid();
        }
      }
      break;
    case COUNTRY:
      {
        if (!value) {
          isFieldHaveError({
            isError: true,
            message: ERROR_MESSAGE.COUNTRY_MESSAGE,
            errorTextId: ERROR_TEXT_ID.COUNTRY_TEXT_ID,
            targetInputName: event.target.name,
          });
          checkFormIsValid();
        } else {
          isFieldHaveError({
            isError: false,
            errorTextId: ERROR_TEXT_ID.COUNTRY_TEXT_ID,
            targetInputName: event.target.name,
          });
          checkFormIsValid();
        }
      }
      break;
    case PHONE_CODE:
      {
        if (value) {
          individualFormFieldValue.phoneCode.isValid = true;
        }
      }
      break;
    case PHONE_NUMBER:
      {
        console.log(value.length);
        const targetField = document.getElementById(PHONE_CLASS);
        if (value.length !== 10) {
          document.getElementById(ERROR_TEXT_ID.PHONE_TEXT_ID).innerHTML =
            ERROR_MESSAGE.PHONE_NUMBER_MESSAGE.VALID;
          targetField.classList.add(INPUT_BORDER_RED_CLASS);
          individualFormFieldValue.phoneNumber.isValid = false;
          checkFormIsValid();
        } else {
          document.getElementById(ERROR_TEXT_ID.PHONE_TEXT_ID).innerHTML = "";
          targetField.classList.remove(INPUT_BORDER_RED_CLASS);
          individualFormFieldValue.phoneNumber.isValid = true;
          checkFormIsValid();
        }
      }
      break;
    default:
      console.log(DEFAULT_MESSAGE);
  }
};
/**
 * changeHandler function called when change occured in any input
 * @param event *this event is passed through addEventListener function
 */
const changeHandler = (event) => {
  individualFormFieldValue[event.target.name].value = event.target.value;

  const { value } = individualFormFieldValue[event.target.name];
  switch (event.target.name) {
    case PHONE_NUMBER:
      {
        if (value.length === 0) {
          const targetField = document.getElementById(PHONE_CLASS);
          document.getElementById(ERROR_TEXT_ID.PHONE_TEXT_ID).innerHTML =
            ERROR_MESSAGE.PHONE_NUMBER_MESSAGE.REQUIRED;
          targetField.classList.add(INPUT_BORDER_RED_CLASS);
          individualFormFieldValue.phoneNumber.isValid = false;
          checkFormIsValid();
        }
      }
      break;
    case ADDRESS:
      {
        if (value.length === 0) {
          isFieldHaveError({
            isError: true,
            message: ERROR_MESSAGE.ADDRESS_MESSAGE.REQUIRED,
            errorTextId: ERROR_TEXT_ID.ADDRESS_TEXT_ID,
            targetInputName: event.target.name,
          });
          checkFormIsValid();
        }
      }
      break;
    default:
      console.log(DEFAULT_MESSAGE);
  }
};

/**
 * handleSubmitEvent will call when form in submitted
 * @param event *this event is passed through addEventListener function
 */
const handleSubmitEvent = (e) => {
  e.preventDefault();
  console.log(individualFormFieldValue);
  const { formIsValid, phoneCode, phoneNumber, address, country } =
    individualFormFieldValue;
  if (formIsValid) {
    const formValue = {
      phoneCode: phoneCode.value,
      phoneNumber: phoneNumber.value,
      address: address.value,
      country: country.value,
    };
    console.log(formValue);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formValue));

    window.location.href = NEXT_PAGE_LINK;
  } else {
    console.log({ ERROR: ERROR_MESSAGE.FORM_ERROR_MESSAGE });
    if (individualFormFieldValue.address.value.length === 0) {
      isFieldHaveError({
        isError: true,
        message: ERROR_MESSAGE.ADDRESS_MESSAGE.REQUIRED,
        errorTextId: ERROR_TEXT_ID.ADDRESS_TEXT_ID,
        targetInputName: ADDRESS,
      });
    }
    if (individualFormFieldValue.phoneNumber.value.length === 0) {
      const targetField = document.getElementById(PHONE_CLASS);
      document.getElementById(ERROR_TEXT_ID.PHONE_TEXT_ID).innerHTML =
        ERROR_MESSAGE.PHONE_NUMBER_MESSAGE.REQUIRED;
      targetField.classList.add(INPUT_BORDER_RED_CLASS);
      individualFormFieldValue.phoneNumber.isValid = false;
    }
  }
};
/**
 * callback function (changeHandler and checkFeildIsValid) call when change and blur event call
 */
phoneCode.addEventListener("change", changeHandler);
phoneCode.addEventListener("blur", checkFeildIsValid);

phoneNumber.addEventListener("change", changeHandler);
phoneNumber.addEventListener("blur", checkFeildIsValid);

address.addEventListener("change", changeHandler);
address.addEventListener("blur", checkFeildIsValid);

country.addEventListener("change", changeHandler);
country.addEventListener("blur", checkFeildIsValid);

registerForm.addEventListener("submit", handleSubmitEvent);
