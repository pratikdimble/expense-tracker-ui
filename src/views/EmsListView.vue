<script setup>
import { onMounted, ref } from 'vue'
import { useEmsStore } from '../stores/EmsStore';
import EmsTable from '../components/EmsTable.vue'
import { useRouter } from 'vue-router'
import EmsCards from '@/components/EmsCards.vue';
import { useStorage } from '@vueuse/core';
import { useUserStore } from '../stores/userStore';
import { useToast } from 'vue-toastification';

const toast = useToast();

const emsStore = useEmsStore()
const router = useRouter()
const userStore = useUserStore()

const showCard = useStorage('emp-view-preference', 'table');
const ordering = useStorage('emp-sort-preference', 'asc');
const userid = localStorage.getItem("userid")

const keyword = ref({
    value:""
});
const selectedDept = ref({
    value:""
});
selectedDept.value="00"
keyword.value =""

const filterBody = ref({
    category: null,
    userId:userid,
    fromDate: '2024-12-15',
    toDate: '2024-12-17',
    keyword: ''
})

const editExpense = (expenseId) => {
    router.push({ name: 'EmployeeEdit', params: { expenseId } })
}

const deleteExpense = async (id) => {
    await emsStore.deleteExpense(id)
    if(userStore.isAuthenticated){
        toast.success('Expense deleted successfully.');
        await emsStore.fetchExpensesByUser(localStorage.getItem("userid"))
    }
    else
        router.push('/login')
}

const searchCriteria = async() =>{
    // console.log(ordering.value)
    // console.log(filterBody.category +" ---------- "+filterBody.keyword)
    await emsStore.filterExpense(filterBody.value)
}

onMounted(async () => {
    if(userStore.isAuthenticated)
        await emsStore.fetchExpensesByUser(localStorage.getItem("userid"))
    else
        router.replace({ path: "/login" });
})

</script>
<template>
    <section id="emp-list" class="list-employee-container">
        <h2>My Expenses</h2>
        <p class="grid">
                <select v-model="filterBody.category" @change="handleSelectionDept" class="dropdown-container">
                    <option disabled value="00" selected>Please select a category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                </select>
       
                <label for="simpleInput" class="input-label">Keyword</label>
                <input id="simpleInput" v-model="filterBody.keyword" type="text" placeholder="Enter keyword" class="input-field" />
                <input id="simpleInputfdate" v-model="filterBody.fromDate" type="date"  class="input-field" />
                <input id="simpleInputldate" v-model="filterBody.toDate" type="date"  class="input-field" />
            </p>
        <small><button @click="searchCriteria">Search</button></small>
        <div v-if="emsStore.error" class="errormessage">{{ emsStore.error }}</div>
        <EmsTable v-if="showCard === 'table'" :loading="emsStore.loading" :empList="emsStore.empList" @edit-click="editExpense" @remove-click="deleteExpense" />
    </section>
</template>
<style scoped>
.input-label{
    align-content: center;
    margin-left: 40px;
}
.list-employee-container {

    margin-top: 50px;
    margin-right: 800px;

}
.dropdown-container {
  font-family: Arial, sans-serif;
  max-width: 450px;
  margin: 10px auto;
  padding: 5px;
  background-color: #f7f7f7;
  border-radius: 8px;
}
.error-message {
    color: red;
    margin-bottom: 15px;
}
.container {
  width: 100%;         /* Ensure container takes up full width */
  height: 100vh;       /* Use full viewport height */
  display: flex;
  justify-content: center; /* Center grid horizontally */
  align-items: center; /* Center grid vertically */
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 100%fr); /* Example: 3 equal columns */
  gap: 0px;       /* Space between grid items */
  width: 227%;       /* Grid width */
  height: 100%;      /* Grid height */
}
</style>
