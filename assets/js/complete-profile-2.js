const BVN = "bvn";
const FORM_ID = "completeProfile2";
const ERROR_MESSAGE = "Bank number should have 15 character";
const ERROR_TEXT_ID = "bvn-error-text";
const FORM_IS_VALID = "formIsValid";
const FORM_ERROR_MESSAGE = "try submit form without filling";
const INPUT_BORDER_RED_CLASS = "input-border-red";
const DEFAULT_MESSAGE = "default";
const NEXT_PAGE_LINK = "/";
const LOCAL_STORAGE_KEY = "step-4";
const BVN_INVALID_CLASS = "bvn-invalid";
/**
 * declare all variable which initailize the element selected by getElementById
 */
const bvn = document.getElementById(BVN);
const registerForm = document.getElementById(FORM_ID);

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
 * @param {object} inputFieldObj *this object error ,message ,errorTextId,targetInputName
 */
const isFieldHaveError = (inputFieldObj) => {
  const { isError, message, errorTextId, targetInputName } = inputFieldObj;
  const targetFeild = document.getElementById(targetInputName);
  if (isError) {
    document.getElementById(errorTextId).innerHTML = message;
    targetFeild.classList.add(INPUT_BORDER_RED_CLASS);
    targetFeild.classList.remove(BVN);
    targetFeild.classList.add(BVN_INVALID_CLASS);
    individualFormFieldValue[targetInputName].isValid = false;
  } else {
    document.getElementById(errorTextId).innerHTML = "";
    targetFeild.classList.remove(INPUT_BORDER_RED_CLASS);
    targetFeild.classList.remove(BVN_INVALID_CLASS);
    targetFeild.classList.add(BVN);
    individualFormFieldValue[targetInputName].isValid = true;
  }
};

const checkFeildIsValid = (event) => {
  const { value } = individualFormFieldValue[event.target.name];
  switch (event.target.name) {
    case BVN:
      {
        if (value.length <= 15) {
          isFieldHaveError({
            isError: true,
            message: ERROR_MESSAGE,
            errorTextId: ERROR_TEXT_ID,
            targetInputName: event.target.name,
          });
          checkFormIsValid();
        } else {
          isFieldHaveError({
            isError: false,
            errorTextId: ERROR_TEXT_ID,
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
 * changeHandler function called when change occured in any input
 * @param event *this event is passed through addEventListener function
 */
const changeHandler = (event) => {
  individualFormFieldValue[event.target.name].value = event.target.value;

  const { value } = individualFormFieldValue[event.target.name];
  switch (event.target.name) {
    case BVN:
      {
        if (value.length === 0) {
          isFieldHaveError({
            isError: true,
            message: ERROR_MESSAGE,
            errorTextId: ERROR_TEXT_ID,
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
const handleSubmitEvent = (event) => {
  event.preventDefault();
  const { formIsValid, bvn } = individualFormFieldValue;
  if (formIsValid) {
    const formValue = {
      bvn: bvn.value,
    };
    console.log(formValue);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formValue));
    window.location.href = NEXT_PAGE_LINK;
  } else {
    console.log({ Error: FORM_ERROR_MESSAGE });
  }
};
/**
 * callback function (changeHandler and checkFeildIsValid) call when change and blur event call
 */
bvn.addEventListener("change", changeHandler);
bvn.addEventListener("blur", checkFeildIsValid);

registerForm.addEventListener("submit", handleSubmitEvent);
