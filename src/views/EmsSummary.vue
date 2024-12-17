<script setup>
import { onMounted, ref } from 'vue'
import { useEmsStore } from '../stores/EmsStore';
import { useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core';
import { useUserStore } from '../stores/userStore';
import { useToast } from 'vue-toastification';

const toast = useToast();

const emsStore = useEmsStore()
const router = useRouter()
const userStore = useUserStore()

const userid = localStorage.getItem("userid")


onMounted(async () => {
    if(userStore.isAuthenticated){
        await emsStore.summaryExpense(localStorage.getItem("userid"))
        console.log(emsStore.summaryList);
    }
        
    else
        router.replace({ path: "/login" });
})

</script>
<template>
    <section id="emp-summary" class="list-employee-container">
        <h2>Monthly Expenses</h2>
        <table v-if="emsStore.summaryList && emsStore.summaryList.length">
            <thead>
                <tr>
                    <th>Month Span</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="emp in emsStore.summaryList" :key="emp.expenseId">
                    <td>{{ emp.monthSpan }} </td>
                    <td>{{ emp.totalExpenses }}</td>
                </tr>
            </tbody>
        </table>
        <label v-else="emsStore.summaryList && emsStore.summaryList.length ==0">No Records Found</label>
    </section>
</template>
<style scoped>
.list-employee-container {

    margin-top: 50px;
    margin-right: 800px;

}

.error-message {
    color: red;
    margin-bottom: 15px;
}
</style>
