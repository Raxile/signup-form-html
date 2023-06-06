// ! Object
let individualFormFieldValue = {
  phoneCode: { value: "", isValid: false },
  phoneNumber: { value: "", isValid: false },
  address: { value: "", isValid: false },
  country: { value: "", isValid: false },
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
    case "address":
      {
        if (value.length <= 3) {
          isFieldHaveError({
            type: "error",
            message: "address should have atleast 3 character",
            id: "address-error-text",
            name: event.target.name,
          });
        } else {
          isFieldHaveError({
            type: "success",
            id: "address-error-text",
            name: event.target.name,
          });
        }
      }
      break;
    case "country":
      {
        if (!value) {
          isFieldHaveError({
            type: "error",
            message: "Select a country",
            id: "country-error-text",
            name: event.target.name,
          });
        } else {
          isFieldHaveError({
            type: "success",
            id: "country-error-text",
            name: event.target.name,
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
        if (value.length !== 10) {
          const targetFeild = document.getElementById("phone");
          document.getElementById("phone-error-text").innerHTML =
            "Enter valid Phone number";
          targetFeild.classList.add("error");
          individualFormFieldValue.phoneNumber.isValid = false;
        } else {
          console.log(event.target.name);
          isFieldHaveError({
            type: "success",
            id: "phone-error-text",
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
  console.log(event.target.name);
  individualFormFieldValue[event.target.name].value = event.target.value;

  const { value } = individualFormFieldValue[event.target.name];
  switch (event.target.name) {
    case "phoneNumber":
      {
        if (value.length === 0) {
          isFieldHaveError({
            type: "error",
            message: "phoneNumber is required",
            id: "phone-error-text",
            name: event.target.name,
          });
        }
      }
      break;
    case "address":
      {
        if (value.length === 0) {
          isFieldHaveError({
            type: "error",
            message: "address is required",
            id: "address-error-text",
            name: event.target.name,
          });
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

    setTimeout(() => {
      window.location.href = "/complete-profile-2.html";
    }, 1000);
  } else {
    console.log("error : try submit form without filling");
  }
};

const phoneCode = document.getElementById("phoneCode");
phoneCode.addEventListener("change", changeHandler);
phoneCode.addEventListener("blur", isFieldEmpty);

const phoneNumber = document.getElementById("phoneNumber");
phoneNumber.addEventListener("change", changeHandler);
phoneNumber.addEventListener("blur", isFieldEmpty);

const address = document.getElementById("address");
address.addEventListener("change", changeHandler);
address.addEventListener("blur", isFieldEmpty);

const country = document.getElementById("country");
country.addEventListener("change", changeHandler);
country.addEventListener("blur", isFieldEmpty);

const registerForm = document.getElementById("completeProfile");
registerForm.addEventListener("submit", (e) => handleSubmitEvent(e));
