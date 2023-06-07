import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../styles/searchFilter.css";
import EmployeeCtx from "../context/EmployeeContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

const SearchFilter = () => {
  const { updateSearchEmpState, updateEmployeeHierarchy } = useContext(EmployeeCtx);
  const [open, setOpen] = useState(false); //Setting State For Opening & Closing Modal
  const [search, setSearch] = useState(""); //Setting Serch Type
  const [filter, setFilter] = useState(""); //Setting Filter Type
  const [serachEmployee, setSearchEmployee] = useState(""); //Setting Value To the Searched Text
  const [Employee, setEmployee] = useState([]); //Setting Value for Searched employee Object
  const [hirechEmployee, setHirechEmployee] = useState([]); //Setting Value For Employee Hirerarchy

  //updating context state for searched employee .
  useEffect(() => {
    updateSearchEmpState(Employee);
  }, [serachEmployee, Employee]);

  //updating context state for employee hirerarchy .
  useEffect(() => {
    updateEmployeeHierarchy(hirechEmployee);
  }, [hirechEmployee]);

  //mock api call for search filter
  const fetchData = async (value, serachType) => {
    const response = await axios
      .get("/employees")
      .then((res) => res.data.employee)
      .then((data) => {
        const result = data.filter((user) => {
          const userName = user?.name;
          const userDesignation = user?.designation;
          const userTeam = user?.team;
          const userManagerId = user?.managerId;
          const userId = user?.id;
          return (
            (value &&
              user &&
              userName &&
              userName.toLowerCase().includes(value)) ||
            (userDesignation &&
              userDesignation.toLowerCase().includes(value)) ||
            (userTeam && userTeam.toLowerCase().includes(value)) ||
            userManagerId === value ||
            userId === value
          );
        });
        //Check result length and setting state to the result value
        if (result.length !== 0) {
          if (value === "") {
            setEmployee([]);
          } else {
            setEmployee(result);
          }
          if (serachType === "filter" && (value === "" || value)) {
            setHirechEmployee(result);
          }
        }
      })
      .catch((err) => {
        return err;
      });
  };

  // handling open of search dialog box
  const handleSearchOpen = () => {
    setOpen(true);
    setSearch("search");
  };

  // handling open of filter dialog box
  const handleFilterOpen = () => {
    setOpen(true);
    setFilter("filter");
  };

  // handling close of search & filter dialog box
  const handleClose = () => {
    setOpen(false);
    setSearch("");
    setFilter("");
  };

  // searchEmployeeHandler() to setSearchEmployee & for searching employee ...
  const searchEmployeeHandler = (value, serachType) => {
    setSearchEmployee(value);
    fetchData(value, serachType);
  };

  return (
    <div className="employee_search_el_filter">
      <Tooltip TransitionComponent={Zoom} title="Search Employee">
        <Button onClick={handleSearchOpen}>
          <SearchIcon style={{ color: "#fff", fontSize: "25px" }} />
        </Button>
      </Tooltip>

      <Tooltip TransitionComponent={Zoom} title="Filter Employee">
        <Button onClick={handleFilterOpen}>
          <FilterAltIcon style={{ color: "#fff", fontSize: "25px" }} />
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box mt={2} sx={style}>
          {search === "search" ? (
            <input
              type="text"
              className="employee_search_box"
              placeholder="Search Employee ..."
              value={serachEmployee || ""}
              onChange={(e) => searchEmployeeHandler(e.target.value, search)}
            />
          ) : (
            <div className="employee_team_filter">
              <label>Search Team</label>
              <select
                name="Select Employee"
                className="employee_filter_selection"
                onChange={(e) => searchEmployeeHandler(e.target.value, filter)}
              >
                <option value=""></option>
                <option>technology</option>
                <option>business</option>
                <option>accounts</option>
              </select>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default SearchFilter;
