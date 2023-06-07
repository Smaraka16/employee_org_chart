import React, { useEffect, useState, useContext } from "react";
import EmployeeCtx from "../context/EmployeeContext";
import mockAdapter from "../mocks/EmployeeMock";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";
import "../styles/employeeRenderer.css";

const EmployeeRender = () => {
  const { searchedEmp, updateEmployeeHierarchy } = useContext(EmployeeCtx); //store context
  const [employeesData, setEmployeeData] = useState([]); //employee data state
  const [selectedEmployee, setSelectedEmployee] = useState(""); //selected employee state
  const [highlightedEmployees, setHighlightedEmployees] = useState([]); //highlighted employees state

  //mock api call
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/employees");
      setEmployeeData(response.data.employee);
      updateEmployeeHierarchy(response.data.employee);
    };
    fetchData();
  }, []);

  //highlight list based on search value
  useEffect(() => {
    if (searchedEmp != null) {
      const highlightedEmployeeIds = searchedEmp.map(
        (employeeData) => employeeData.id
      );
      setHighlightedEmployees(highlightedEmployeeIds);
    }
  }, [searchedEmp]);

  //event handler on click employee name
  const handleClick = (id) => {
    setSelectedEmployee(id === selectedEmployee ? null : id);
  };

  return (
    <div className="employee_el_render">
      <div className="employee_el_block">
        {employeesData.map((employeeData) => (
          <div
            className={`employee_list ${
              highlightedEmployees.includes(employeeData.id)
                ? "highlighted"
                : ""
            }`}
            key={employeeData.id}
          >
            <div
              className={`employee_name_item ${
                selectedEmployee === employeeData.id ? "selected" : ""
              }`}
              onClick={() => handleClick(employeeData.id)}
              style={{
                backgroundColor:
                  selectedEmployee === employeeData.id ? "#001E5A" : "",
                color: selectedEmployee === employeeData.id ? "#fff" : "",
                width: selectedEmployee === employeeData.id ? "100%" : "",
              }}
            >
              <div className="employee_li_render">
                <div>
                  <img
                    className="employee_li_icon"
                    src={employeeData.image}
                    alt="icon"
                  ></img>
                </div>
                <div>
                  <li
                    className="employee_li_item"
                    style={{
                      color: selectedEmployee === employeeData.id ? "#fff" : "",
                    }}
                  >
                    {employeeData.name}
                  </li>
                </div>
              </div>

              <div className="expand_toggler">
                <ExpandLessIcon
                  style={{
                    transform:
                      selectedEmployee === employeeData.id
                        ? "rotate(180deg)"
                        : "",
                    transition:
                      selectedEmployee === employeeData.id
                        ? ".15s ease-in"
                        : ".15s ease-out",
                  }}
                />
              </div>
            </div>

            {employeeData.id === selectedEmployee && (
              <div className="employee_li_toggler">
                <li className="employee_li_item employee_li_item_toggler">
                  {employeeData.id}
                </li>
                <li className="employee_li_item employee_li_item_toggler">
                  {employeeData.designation}
                </li>
                <li className="employee_li_item employee_li_item_toggler">
                  {employeeData.team}
                </li>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeRender;
