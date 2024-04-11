import { HandleValidation } from "interfaces/utils.interface";

const handleValidation = (
  firstName: string,
  lastName: string,
  contactMode: string,
  email: string,
  password: string,
  confirmPassword: string,
  act: string
): HandleValidation => {
  if (act === "signup") {
    if (firstName === "" || confirmPassword === "" || contactMode === "") {
      return {
        valid: false,
        message: "",
        error: "Please fill all the fields",
      };
    }

    if (password !== confirmPassword) {
      return {
        valid: false,
        message: "",
        error: "Passwords do not match",
      };
    }

    if (password.length < 8) {
      return {
        valid: false,
        message: "",
        error: "Password must be at least 8 characters long",
      };
    }

    const nameRegex = /^[A-Za-z]+$/;
    if (nameRegex.test(firstName)) {
      return {
        valid: false,
        message: "",
        error: "Please enter a valid first name",
      };
    }

    if (lastName !== "" && nameRegex.test(lastName)) {
      return {
        valid: false,
        message: "",
        error: "Please enter a valid last name",
      };
    }
  }

  if (email === "" || password === "") {
    return {
      valid: false,
      message: "",
      error: "Please fill all the fields",
    };
  }

  if (/^\S+@\S+\.\S+$/.test(email) === false) {
    return {
      valid: false,
      message: "",
      error: "Please enter a valid email address",
    };
  }

  return {
    valid: true,
    message: "All fields are correctly filled",
    error: "",
  };
};

export default handleValidation;
