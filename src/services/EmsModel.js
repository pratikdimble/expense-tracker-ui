export const EmsModel = {
    validate(emp) {
      const errors = {};
  
      if (!emp.title || emp.title.trim() === "") {
        errors.name = "Title cannot be empty";
      }
      // const today = new Date();
      // const joiningDate = new Date(emp.updatedDate);
  
      console.log("validation errors:", errors);
  
      return errors;
    },
  };
  