// ! Object
let individualFormFieldValue = {
  bvn: { value: "", isValid: false },
  formIsValid: false,
};

const isFieldHaveError = (obj) => {
  const { type, message, id, name } = obj;
  const targetFeild = document.getElementById(name);
  if (type === "error") {
    document.getElementById(id).innerHTML = message;
    targetFeild.classList.add("error");
    targetFeild.classList.remove("bvn");
    targetFeild.classList.add("bvn-invalid");
    individualFormFieldValue[name].isValid = false;
  } else if (type === "success") {
    document.getElementById(id).innerHTML = "";
    targetFeild.classList.remove("error");
    targetFeild.classList.remove("bvn-invalid");
    targetFeild.classList.add("bvn");
    individualFormFieldValue[name].isValid = true;
  }
  checkFormIsValid();
};
const checkFormIsValid = () => {
  const count = Object.keys(individualFormFieldValue).reduce(
    (accumulator, currentValue) => {
      if (currentValue !== "formIsValid") {
        if (individualFormFieldValue[currentValue].isValid) {
          ++accumulator;
        }
      }
      return accumulator;
    },
    0
  );
  if (count === 1) {
    individualFormFieldValue.formIsValid = true;
  } else individualFormFieldValue.formIsValid = false;
};

const isFieldEmpty = (event) => {
  const { value } = individualFormFieldValue[event.target.name];
  switch (event.target.name) {
    case "bvn":
      {
        if (value.length <= 15) {
          isFieldHaveError({
            type: "error",
            message: "Bank number should have 15 character",
            id: "bvn-error-text",
            name: event.target.name,
          });
        } else {
          isFieldHaveError({
            type: "success",
            id: "bvn-error-text",
            name: event.target.name,
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
            type: "error",
            message: "Bank number should have 15 character",
            id: "bvn-error-text",
            name: event.target.name,
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

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } else {
    console.log("error : try submit form without filling");
  }
};
const bvn = document.getElementById("bvn");
bvn.addEventListener("change", changeHandler);
bvn.addEventListener("blur", isFieldEmpty);

const registerForm = document.getElementById("completeProfile2");
registerForm.addEventListener("submit", (e) => handleSubmitEvent(e));
