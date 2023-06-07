import "./App.css";
import React, { useState, useEffect} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import EmployeeRender from "./components/EmployeeRenderer";
import EmployeeHierarchyTree from "./components/EmployeeHierarchyTree";
import SearchFilter from "./components/SearchFilter";
import EmployeeState from "./context/EmployeeState";
 
function App() {
  const [isRenderChild, setIsRenderChild] = useState(false);

  // Holds the child component from getting rendered.
  // Its updating state and the updated value is getting used.
  useEffect(() => {
    // Simulating an asynchronous action
    setTimeout(() => {
      setIsRenderChild(true);
    }, 1000);
  }, []);

  return (
    <div className="App">
      <EmployeeState>
        <EmployeeRender />
        <div className="hierarch_tree_search_wrapper">
          <SearchFilter className="employee_search_icon" />
          {isRenderChild ? (
            <EmployeeHierarchyTree />
          ) : (
            <div className="hierarchy_loader_component">
              <CircularProgress />
            </div>
          )}
        </div>
      </EmployeeState>
    </div>
  );
}

export default App;
