export const EmsModel = {
    validate(emp) {
      const errors = {};
  
      if (!emp.title || emp.title.trim() === "") {
        errors.name = "Name cannot be empty";
      }
  
      // if (!emp.address || emp.address.length < 10 || emp.address.length > 200) {
      //   errors.tasaddressk = "Address must be between 10 and 200 characters";
      // }
  
      const today = new Date();
      const joiningDate = new Date(emp.updatedDate);
  
      // if (!emp.joiningDate || isNaN(joiningDate.getTime())) {
      //   errors.joiningDate = "Target date is required";
      // } else if (joiningDate > today) {
      //   errors.joiningDate = "Joining date must be today or in the past";
      // }
  
      console.log("validation errors:", errors);
  
      return errors;
    },
  };
  