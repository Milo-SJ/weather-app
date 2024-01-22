const validateRef = document.getElementById("location-search");

const userInput = {};

validateRef.addEventListener("input", (e) => {
  userInput[e.target.name] = e.target.value;
  console.log(userInput);

  Joi.validate(userInput, schema, { abortEarly: false }, (errors, results) => {
    const errorsMod = {};

    if (errors) {
      errors.details.forEach((error) => {
        errorsMod[error.context.key] = error.message;
      });
    }

    const errorRefs = document.getElementById("error-message");
    Array.from(errorRefs).forEach((error) => {
      error.innerHTML = "";
    });

    for (const error in errorsMod) {
      document.getElementById(`${error}Error`).innerHTML = errorsMod[error];
    }
  });
});
