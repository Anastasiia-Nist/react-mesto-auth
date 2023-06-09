import React from "react";
// кастомный хук
export function useInput(inputValues={}) {
    const [values, setValues] = React.useState(inputValues);
  
    const handleChange = (event) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
  }
  