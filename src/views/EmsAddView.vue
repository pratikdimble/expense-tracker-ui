
<script setup>
import { ref } from 'vue'
import { useEmsStore } from '../stores/EmsStore'
import { useRouter } from 'vue-router'
import EmsForm from '../components/EmsForm.vue'
import { useToast } from 'vue-toastification';

const toast = useToast();

const emsStore = useEmsStore()
const router = useRouter()

const userid = localStorage.getItem("userid")

const newEmp = ref({
    expenseId: '',
    userId:userid,
    title: '',
    category: '',
    amount: 0.0,
    updatedDate: ''
})

const addExpense = async () => {
    await emsStore.addExpense(newEmp.value)
    if (!emsStore.hasError) {
        toast.success('Expense added successfully.');
        router.push('/')
    }else{
        toast.error('Failed to add expense.');
    }
}

const resetForm = () => {
    newEmp.value = {
        expenseId: '',
        userId:userid,
        title: '',
        category: '',
        amount: 0.0,
        updatedDate: ''
    }
    emsStore.clearErrors()
}
</script>

<template>
    <section id="emp-add" class="add-employee-container">
        <h2>Add Expense</h2>
        <div v-if="emsStore.error" class="error-message"> {{ emsStore.error }} </div>
        <EmsForm
            :loading="emsStore.loading"
            v-model:emp="newEmp"
            v-model:validationErrors="emsStore.validationErrors"
            form-label="Add: Expense"
            submit-label="Add Expense"
            reset-label="Reset"
            @submit="addExpense"
            @reset="resetForm"
        />
    </section>
</template>

<style scoped>
.add-employee-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 20px auto;
}

h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
}

.error-message {
    color: red;
    margin-bottom: 15px;
}

@media (max-width: 768px) {
    .add-employee-container {
        padding: 15px;
        width: 100%;
        margin: 10px;
    }
}
</style>
