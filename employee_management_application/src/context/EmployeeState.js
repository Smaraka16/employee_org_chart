import React, { useState } from "react";
import EmployeeCtx from "./EmployeeContext";

// holding different states values
const EmployeeState = (props) => {
  const [searchedEmp, setSearchedEmp] = useState([]);
  const [empHirerarchy, setEmpHierarchy] = useState({});

  //function to searchedEmp
  const updateSearchEmpState = (emp) => {
    setSearchedEmp(emp);
  };
  //function to empHirerarchy
  const updateEmployeeHierarchy = (emp) => {
    setEmpHierarchy(emp);
  };

  return (
    <EmployeeCtx.Provider
      value={{
        searchedEmp,
        updateSearchEmpState,
        empHirerarchy,
        updateEmployeeHierarchy,
      }}
    >
      {props.children}
    </EmployeeCtx.Provider>
  );
};

export default EmployeeState;
