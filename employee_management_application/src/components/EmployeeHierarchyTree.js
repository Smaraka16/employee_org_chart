import React, { useContext } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import EmployeeCtx from "../context/EmployeeContext";
import "../styles/employeeHierarchy.css";

const EmployeeHierarchyTree = () => {
  const { empHirerarchy } = useContext(EmployeeCtx); //Getting Employee Objects From Context State

  const convertEmployeeDataToNestedObject = (data) => {
    //Filtering root parent based on managerId
    const rootEmployee = data.find(
      (employee) => employee?.managerId === null || employee?.managerId !== null
    );
    // Recursive Approach To Build Children Json Structure
    const traverseEmployee = (employee) => {
      const node = {
        image: employee?.image,
        id: employee?.id,
        name: employee?.name,
        title: employee?.designation,
        managerId: employee?.managerId,
      };

      //Getting Employee Based On Checking managerId and employeeId
      const directReports = data.filter((e) => e?.managerId === employee?.id);

      if (directReports.length > 0) {
        node.children = directReports.map((report) => traverseEmployee(report));
      }

      return node;
    };
    return traverseEmployee(rootEmployee);
  };

  // if empHirerarchy available call convertEmployeeDataToNestedObject(empHirerarchy)
  const structuredHierarchy = empHirerarchy
    ? convertEmployeeDataToNestedObject(empHirerarchy)
    : null;

  return (
    <div className="employee_orgchart_render">
      <h1 className="employee_header_label">Employee Organization Chart</h1>
      {/* rendering org chart component */}
      {structuredHierarchy && (
        <OrganizationChart datasource={structuredHierarchy} draggable={true} />
      )}
    </div>
  );
};

export default EmployeeHierarchyTree;
