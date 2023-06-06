// ! Object
let individualFormFieldValue = {
  fullName: { value: "", isValid: false },
  email: { value: "", isValid: false },
  password: { value: "", isValid: false },
  termsAndCondition: { value: false, isValid: false },
  formIsValid: false,
};

const isFieldHaveError = (obj) => {
  const { type, message, id, name } = obj;
  const targetFeild = document.getElementById(name);
  if (type === "error") {
    document.getElementById(id).innerHTML = message;
    targetFeild.classList.add("error");
    individualFormFieldValue[name].isValid = false;
  } else if (type === "success") {
    document.getElementById(id).innerHTML = "";
    targetFeild.classList.remove("error");
    individualFormFieldValue[name].isValid = true;
  }
  checkFormIsValid();
};

// const checkFieldsIsValid = (event) =>
const isFieldEmpty = (event) => {
  const { value } = individualFormFieldValue[event.target.name];
  switch (event.target.name) {
    case "fullName":
      {
        const regEx = /^(\*?[A-Za-z]+\s+?[A-Za-z])|(\*?[A-Za-z])+$/;
        if (!regEx.test(value)) {
          isFieldHaveError({
            type: "error",
            message: "please enter Valid Name",
            id: "fullName-error-text",
            name: event.target.name,
          });
        } else if (value.length <= 3) {
          isFieldHaveError({
            type: "error",
            message: "name should have atleast 3 character",
            id: "fullName-error-text",
            name: event.target.name,
          });
        } else if (value.length >= 20) {
          isFieldHaveError({
            type: "error",
            message: "name should have atmost 20  character",
            id: "fullName-error-text",
            name: event.target.name,
          });
        } else {
          isFieldHaveError({
            type: "success",
            id: "fullName-error-text",
            name: event.target.name,
          });
        }
      }
      break;
    case "email":
      {
        const regEx = /^\S+@+\S+.+\S+$/;
        if (!regEx.test(value)) {
          isFieldHaveError({
            type: "error",
            message: "enter valid email address",
            id: "email-error-text",
            name: event.target.name,
          });
        } else {
          isFieldHaveError({
            type: "success",
            id: "email-error-text",
            name: event.target.name,
          });
        }
      }
      break;
    case "password":
      {
        if (value.length < 8) {
          isFieldHaveError({
            type: "error",
            id: "password-error-text",
            message: "enter a strong password",
            name: event.target.name,
          });
        } else {
          isFieldHaveError({
            type: "success",
            id: "password-error-text",
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
    case "fullName":
      {
        if (value.length === 0) {
          console.log(typeof value);
          document.getElementById("fullName-error-text").innerHTML =
            "fullName is Reqired";
          individualFormFieldValue[event.target.name].isValid = false;

          fullName.classList.add("error");
        }
      }
      break;
    case "email":
      {
        if (value.length === 0) {
          document.getElementById("email-error-text").innerHTML =
            "Email is required";
          email.classList.add("error");
        }
      }
      break;
    case "password":
      {
        if (value.length === 0) {
          document.getElementById("password-error-text").innerHTML =
            "Password is required";
          password.classList.add("error");
        }
      }
      break;
    default:
      console.log("default");
  }
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
  if (count === 4) {
    individualFormFieldValue.formIsValid = true;
  } else individualFormFieldValue.formIsValid = false;
};
const handleSubmitEvent = (e) => {
  e.preventDefault();
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

    setTimeout(() => {
      window.location.href = "/complete-profile.html";
    }, 1000);
  } else {
    console.log("error : try submit form without filling");
  }
};

const fullName = document.getElementById("fullName");
fullName.addEventListener("change", changeHandler);
fullName.addEventListener("blur", isFieldEmpty);

const email = document.getElementById("email");
email.addEventListener("change", changeHandler);
email.addEventListener("blur", isFieldEmpty);

const password = document.getElementById("password");
password.addEventListener("change", changeHandler);
password.addEventListener("blur", isFieldEmpty);

const termsAndCondition = document.getElementById("termsAndCondition");
termsAndCondition.addEventListener("change", (event) => {
  individualFormFieldValue[event.target.name].value = event.target.checked;
  individualFormFieldValue[event.target.name].isValid = event.target.checked;
  checkFormIsValid();
});

const registerForm = document.getElementById("individual-form-step-1");
registerForm.addEventListener("submit", (e) => handleSubmitEvent(e));
