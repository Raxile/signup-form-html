const FORM_IS_VALID = "formIsValid";
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
};

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
const phoneCode = document.getElementById("phoneCode");
const address = document.getElementById("address");
const phoneNumber = document.getElementById("phoneNumber");
const registerForm = document.getElementById("completeProfile");
const country = document.getElementById("country");

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
  const targetFeild = document.getElementById(targetInputName);
  if (isError) {
    document.getElementById(errorTextId).innerHTML = message;
    targetFeild.classList.add("input-border-red");
    individualFormFieldValue[targetInputName].isValid = false;
  } else {
    document.getElementById(errorTextId).innerHTML = "";
    targetFeild.classList.remove("input-border-red");
    individualFormFieldValue[targetInputName].isValid = true;
  }
  checkFormIsValid();
};

const checkFeildIsValid = (event) => {
  const { value } = individualFormFieldValue[event.target.name];
  switch (event.target.name) {
    case "address":
      {
        if (value.length <= 3) {
          isFieldHaveError({
            isError: true,
            message: ERROR_MESSAGE.ADDRESS_MESSAGE.MIN,
            errorTextId: ERROR_TEXT_ID.ADDRESS_TEXT_ID,
            targetInputName: event.target.name,
          });
        } else {
          isFieldHaveError({
            isError: false,
            errorTextId: ERROR_TEXT_ID.ADDRESS_TEXT_ID,
            targetInputName: event.target.name,
          });
        }
      }
      break;
    case "country":
      {
        if (!value) {
          isFieldHaveError({
            isError: true,
            message: ERROR_MESSAGE.COUNTRY_MESSAGE,
            errorTextId: ERROR_TEXT_ID.COUNTRY_TEXT_ID,
            targetInputName: event.target.name,
          });
        } else {
          isFieldHaveError({
            isError: false,
            errorTextId: ERROR_TEXT_ID.COUNTRY_TEXT_ID,
            targetInputName: event.target.name,
          });
        }
      }
      break;
    case "phoneCode":
      {
        if (value) {
          individualFormFieldValue.phoneCode.isValid = true;
        }
      }
      break;
    case "phoneNumber":
      {
        console.log(value.length);
        const targetField = document.getElementById("phone");
        if (value.length !== 10) {
          document.getElementById(ERROR_TEXT_ID.PHONE_TEXT_ID).innerHTML =
            ERROR_MESSAGE.PHONE_NUMBER_MESSAGE.VALID;
          targetField.classList.add("input-border-red");
          individualFormFieldValue.phoneNumber.isValid = false;
        } else {
          document.getElementById(ERROR_TEXT_ID.PHONE_TEXT_ID).innerHTML = "";
          targetField.classList.remove("input-border-red");
          individualFormFieldValue.phoneNumber.isValid = true;
        }
      }
      break;
    default:
      console.log("default");
  }
};
const changeHandler = (event) => {
  console.log(event.target.name);
  individualFormFieldValue[event.target.name].value = event.target.value;

  const { value } = individualFormFieldValue[event.target.name];
  switch (event.target.name) {
    case "phoneNumber":
      {
        if (value.length === 0) {
          const targetField = document.getElementById("phone");
          document.getElementById(ERROR_TEXT_ID.PHONE_TEXT_ID).innerHTML =
            ERROR_MESSAGE.PHONE_NUMBER_MESSAGE.REQUIRED;
          targetField.classList.add("input-border-red");
          individualFormFieldValue.phoneNumber.isValid = false;
        }
      }
      break;
    case "address":
      {
        if (value.length === 0) {
          isFieldHaveError({
            isError: true,
            message: ADDRESS_MESSAGE.VALID,
            errorTextId: "address-error-text",
            targetInputName: event.target.name,
          });
        }
      }
      break;
    default:
      console.log("default");
  }
};

const handleSubmitEvent = (e) => {
  console.log(individualFormFieldValue);
  e.preventDefault();
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
    localStorage.setItem("step-3", JSON.stringify(formValue));

    window.location.href = "/complete-profile-2.html";
  } else {
    console.log("error : try submit form without filling");
  }
};

phoneCode.addEventListener("change", changeHandler);
phoneCode.addEventListener("blur", checkFeildIsValid);

phoneNumber.addEventListener("change", changeHandler);
phoneNumber.addEventListener("blur", checkFeildIsValid);

address.addEventListener("change", changeHandler);
address.addEventListener("blur", checkFeildIsValid);

country.addEventListener("change", changeHandler);
country.addEventListener("blur", checkFeildIsValid);

registerForm.addEventListener("submit", (e) => handleSubmitEvent(e));
