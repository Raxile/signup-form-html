const FORMISVALID = "formIsValid";
const FULLNAMEREGEX = /^[A-Za-z ]{3,20}$/;
const EMAILREGEX = /^\S+@+\S+.+\S+$/;
const ERRORTEXTID = {
  EMAILTEXTID: "email-error-text",
  FULLNAMETEXTID: "fullName-error-text",
  PASSWORDTEXTID: "password-error-text",
};
const ERRORMESSAGE = {
  FULLNAMEMESSAGE: {
    REQUIRED: "Please enter Name",
    MIN: "Name should have atleast 3 character",
    MAX: "Name should have atmost 20 character",
    VALID: "Please enter Valid Name",
  },
  EMAILMESSAGE: {
    VALID: "Please enter valid Email",
    REQUIRED: "Please enter Email",
  },

  PASSWORDMESSAGE: {
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
      individualFormFieldValue[element] !== FORMISVALID &&
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
        if (!FULLNAMEREGEX.test(value)) {
          isFieldHaveError({
            isError: true,
            message: ERRORMESSAGE.FULLNAMEMESSAGE.VALID,
            errorTextId: ERRORTEXTID.FULLNAMETEXTID,
            targetInputName: event.target.name,
          });
        } else if (value.length <= 3) {
          isFieldHaveError({
            isError: true,
            message: ERRORMESSAGE.FULLNAMEMESSAGE.MIN,
            errorTextId: ERRORTEXTID.FULLNAMETEXTID,
            targetInputName: event.target.name,
          });
        } else if (value.length >= 20) {
          isFieldHaveError({
            isError: true,
            message: ERRORMESSAGE.FULLNAMEMESSAGE.M,
            errorTextId: ERRORTEXTID.FULLNAMETEXTID,
            targetInputName: event.target.name,
          });
        } else {
          isFieldHaveError({
            isError: false,
            errorTextId: ERRORTEXTID.FULLNAMETEXTID,
            targetInputName: event.target.name,
          });
        }
      }
      break;
    case "email":
      {
        if (!EMAILREGEX.test(value)) {
          isFieldHaveError({
            isError: true,
            message: ERRORMESSAGE.EMAILMESSAGE.VALID,
            errorTextId: ERRORTEXTID.EMAILTEXTID,
            targetInputName: event.target.name,
          });
        } else {
          isFieldHaveError({
            isError: false,
            errorTextId: ERRORTEXTID.EMAILTEXTID,
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
            errorTextId: ERRORTEXTID.PASSWORDTEXTID,
            message: ERRORMESSAGE.PASSWORDMESSAGE.VALID,
            targetInputName: event.target.name,
          });
        } else {
          isFieldHaveError({
            isError: false,
            errorTextId: ERRORTEXTID.PASSWORDTEXTID,
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
            message: ERRORMESSAGE.FULLNAMEMESSAGE.REQUIRED,
            errorTextId: ERRORTEXTID.FULLNAMETEXTID,
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
            message: ERRORMESSAGE.EMAILMESSAGE.REQUIRED,
            errorTextId: ERRORTEXTID.EMAILTEXTID,
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
            message: ERRORMESSAGE.PASSWORDMESSAGE.REQUIRED,
            errorTextId: ERRORTEXTID.PASSWORDTEXTID,
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
