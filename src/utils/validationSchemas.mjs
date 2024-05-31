export const createValidationSchema = {
  filter: {
    isLength: {
      options: {
        min: 3,
        max: 10,
      },
      errorMessage:
        "Filter must be at least 3 characters with a max of 10 characters",
    },
    notEmpty: {
      errorMessage: "Filter cannot be empty",
    },
    isString: {
      errorMessage: "Filter must be a string!",
    },
  },
  value: {
    isLength: {
      options: {
        min: 3,
        max: 24,
      },
      errorMessage:
        "Value must be at least 3 characters with a max of 24 characters",
    },
    notEmpty: {
      errorMessage: "Value cannot be empty",
    },
    isString: {
      errorMessage: "Value must be a string!",
    },
  },
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "Username must be at least 5 characters with a max of 32 characters",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "Username must be a string!",
    },
  },
  /*  */
  /*  */
  displayName: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "Display name must be at least 3 characters with a max of 32 characters",
    },
    notEmpty: {
      errorMessage: "Display name cannot be empty",
    },
    isString: {
      errorMessage: "Display name must be a string!",
    },
  },
};
