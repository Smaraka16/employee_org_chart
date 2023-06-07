import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import employeeData from "./EmployeeData.js";

// creating mockadapter instance
const mockAdapter = new MockAdapter(axios);

//get all employees list
mockAdapter.onGet("/employees").reply(200, employeeData);

export default mockAdapter;
