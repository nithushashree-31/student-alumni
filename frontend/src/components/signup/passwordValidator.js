export const passwordValidator = (value, notEqualToValue) => {
    if (!value) {
      return Promise.reject(new Error("Please input the password!"));
    }
  
    const checks = [
      {
        test: value.length >= 12,
        error: "Password must be at least 12 characters long",
      },
      {
        test: /[A-Z]/.test(value),
        error: "Password must include at least one uppercase letter",
      },
      {
        test: /[a-z]/.test(value),
        error: "Password must include at least one lowercase letter",
      },
      {
        test: /[0-9]/.test(value),
        error: "Password must include at least one number",
      },
      {
        test: /[!@#$%^&*]/.test(value),
        error: "Password must include at least one special character (!@#$%^&*)",
      },
      { test: !/\s/.test(value), error: "Password cannot contain spaces" },
    ];
    
    if (notEqualToValue) {
      checks.push({
        test: !value.toLowerCase().includes(notEqualToValue.toLowerCase()),
        error: "Password cannot contain your email address",
      });
    }
  
    for (const { test, error } of checks) {
      if (!test) {
        return Promise.reject(new Error(error));
      }
    }
    return Promise.resolve();
  };
    