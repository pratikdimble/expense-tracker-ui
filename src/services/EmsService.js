import axios from "axios";
import { EmsModel} from "./EmsModel";

const AUTH_URL = "http://localhost:8080/api/login";

const API_BASE_URL = "http://localhost:8080/api/expense";
const GET_ALL_EXPENSES = "/users/";
const FILTER_API = "/filter";
const SUMMARY_EXPENSES ="/summary";


const SORT_EMPLOYEE_JOIN_DATE_ASC_DESC = "/users/sort/"
const USER_DETAILS = "/users/";

export const EmsService = {

  async login(user) {
    try {
      const response = await axios.post(AUTH_URL, user);
      localStorage.setItem("userid", (+response.data));
      console.log("User ID ===> "+response.data)
      return response.data;
    } catch (error) {
      throw new Error("Invalid Credentials");
    }
  },

  async getEmployees() {
    try {
      const response = await axios.get(`${API_BASE_URL}${GET_ALL_EXPENSES}/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch employees");
    }
  },

  async fetchExpensesByUser(userid) {
    try {
      const response = await axios.get(`${API_BASE_URL}${GET_ALL_EXPENSES}${userid}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch expenses");
    }
  },

  async addExpense(emp) {
    const validationErrors = EmsModel.validate(emp);
    if (Object.keys(validationErrors).length > 0) {
      throw validationErrors;
    }
    try {
      const response = await axios.post(API_BASE_URL, emp);
      return response.data;
    } catch (error) {
      throw new Error("Failed to add expense");
    }
  },

  async updateExpense(emp) {
    const validationErrors = EmsModel.validate(emp);
    if (Object.keys(validationErrors).length > 0) {
      throw validationErrors;
    }
    try {
      const response = await axios.put(`${API_BASE_URL}/${emp.expenseId}`, emp);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update expense");
    }
  },

  async deleteExpense(id) {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      throw new Error("Failed to delete expense");
    }
  },

  async filterExpense(filterBody) {
    try {
      const response = await axios.post(`${API_BASE_URL}${FILTER_API}`, filterBody);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch expenses");
    }
  },
  async summaryExpense(userid) {
    try {
      const response = await axios.get(`${API_BASE_URL}${SUMMARY_EXPENSES}/${userid}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch expenses");
    }
  },





  async getEmployeeByDepartment(dept) {
    try {
      const response = await axios.get(`${API_BASE_URL}${API_SEARCH_BY_DEPT}${dept}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch employees");
    }
  },

  async sortEmployeeByJoiningDate(order) {
    try {
      const response = await axios.get(`${API_BASE_URL}${SORT_EMPLOYEE_JOIN_DATE_ASC_DESC}${order}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch employees");
    }
  },
}