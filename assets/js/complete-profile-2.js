const ERROR_MESSAGE = "Bank number should have 15 character";
const ERROR_TEXT_ID = "bvn-error-text";
const FORM_IS_VALID = "formIsValid";
/**
 * declare all variable which initailize the element selected by getElementById
 */
const bvn = document.getElementById("bvn");
const registerForm = document.getElementById("completeProfile2");

/**
 * individualFormFieldValue is a object that stores the value of each field and also indicates each feild is valid or form is valid or not
 */
let individualFormFieldValue = {
  bvn: { value: "", isValid: false },
  formIsValid: false,
};

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
    targetFeild.classList.remove("bvn");
    targetFeild.classList.add("bvn-invalid");
    individualFormFieldValue[targetInputName].isValid = false;
  } else {
    document.getElementById(errorTextId).innerHTML = "";
    targetFeild.classList.remove("input-border-red");
    targetFeild.classList.remove("bvn-invalid");
    targetFeild.classList.add("bvn");
    individualFormFieldValue[targetInputName].isValid = true;
  }
  checkFormIsValid();
};

const checkFeildIsValid = (event) => {
  const { value } = individualFormFieldValue[event.target.name];
  switch (event.target.name) {
    case "bvn":
      {
        if (value.length <= 15) {
          isFieldHaveError({
            isError: true,
            message: ERROR_MESSAGE,
            errorTextId: ERROR_TEXT_ID,
            targetInputName: event.target.name,
          });
        } else {
          isFieldHaveError({
            isError: false,
            errorTextId: ERROR_TEXT_ID,
            targetInputName: event.target.name,
          });
        }
      }
      break;
    default:
      console.log("default");
  }
};

const changeHandler = (event) => {
  individualFormFieldValue[event.target.name].value = event.target.value;

  const { value } = individualFormFieldValue[event.target.name];
  switch (event.target.name) {
    case "bvn":
      {
        if (value.length === 0) {
          isFieldHaveError({
            isError: true,
            message: ERROR_MESSAGE,
            errorTextId: ERROR_TEXT_ID,
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
  const { formIsValid, bvn } = individualFormFieldValue;
  if (formIsValid) {
    const formValue = {
      bvn: bvn.value,
    };
    console.log(formValue);
    localStorage.setItem("step-4", JSON.stringify(formValue));
    window.location.href = "/";
  } else {
    console.log("error : try submit form without filling");
  }
};
bvn.addEventListener("change", changeHandler);
bvn.addEventListener("blur", checkFeildIsValid);

registerForm.addEventListener("submit", (e) => handleSubmitEvent(e));
