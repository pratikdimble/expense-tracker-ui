import { defineStore } from 'pinia';
import { EmsModel } from "../services/EmsModel";
import { EmsService } from "../services/EmsService";
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useEmsStore = defineStore('emsStore', {
    state: () => ({
        empList: [],
        loading: false,
        error: null,
        validationErrors: {},
        summaryList:[]
    }),
    actions: {
        async login(user) {
            this.loading = true;
            try {
                 await EmsService.login(user)
            } catch (err) {
                this.loading = false;
                // this.error = 'Invalid Credentials';
            } finally {
                this.loading = false;
            }
        },
        async fetchEmps() {
            this.loading = true;
            try {
                this.empList = await EmsService.getEmployees()
            } catch (err) {
                this.error = 'Failed to fetch employees';
            } finally {
                this.loading = false;
            }
        },
        async fetchExpensesByUser(userid) {
            this.loading = true;
            try {
                this.empList = await EmsService.fetchExpensesByUser(userid)
            } catch (err) {
                this.error = 'Failed to fetch my expenses';
            } finally {
                this.loading = false;
            }
        },
        async addExpense(newEmp) {
            this.loading = true;
            const errors = EmsModel.validate(newEmp);
            if (Object.keys(errors).length > 0) {
                this.validationErrors = errors;
            }else{
                try {
                    await EmsService.addExpense(newEmp)
                } catch (err) {
                    this.error = 'Failed to add expense';
                } finally {
                    this.loading = false;
                }
            }
        },
        async updateExpense(updatedEmp) {
            const index = this.empList.findIndex((emp) => emp.expenseId === updatedEmp.expenseId);
            const errors = EmsModel.validate(updatedEmp);
            if (Object.keys(errors).length > 0) {
                this.validationErrors = errors;
            }else{
                if (index !== -1) {
                    await EmsService.updateExpense(updatedEmp)
                } else {
                    this.error = 'Expense not found';
                }
            }
        },
        async deleteExpense(id) {
            const index = this.empList.findIndex((emp) => emp.expenseId === id);
            if (index !== -1) {
                await EmsService.deleteExpense(id)
            } else {
                this.error = 'Expense not found';
            }    
        },


        async filterExpense(filterBody){
            this.loading = true;
            try {
                this.empList = await EmsService.filterExpense(filterBody)
            } catch (err) {
                this.error = 'Failed to fetch my expenses';
            } finally {
                this.loading = false;
            }
        },

        async summaryExpense (userid) {
            this.loading = true;
            try {
                this.summaryList = await EmsService.summaryExpense(userid)
            } catch (err) {
                this.error = 'Failed to fetch my expenses';
            } finally {
                this.loading = false;
            }
        },



        
        async getEmployeeByDepartment(dept) {
            this.loading = true;
            try {
                this.empList = await EmsService.getEmployeeByDepartment(dept)
            } catch (err) {
                this.error = 'Failed to fetch employees';
            } finally {
                this.loading = false;
            }   
        },
        
        async sortEmployeeByJoiningDate(order) {
            this.loading = true;
            try {
                this.empList = await EmsService.sortEmployeeByJoiningDate(order)
            } catch (err) {
                this.error = 'Failed to fetch employees';
            } finally {
                this.loading = false;
            }   
        },
    },
});
