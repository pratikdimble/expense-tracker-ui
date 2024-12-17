<script setup>
import { ref, onMounted } from 'vue'
import { useEmsStore } from '../stores/EmsStore'
import { useRouter } from 'vue-router'
import EmsForm from '../components/EmsForm.vue'
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
    expenseId: {
        type: String,
        required: true
    }
})

const emsStore = useEmsStore()
const router = useRouter()

const editingEmp = ref(null)

const updateExpense = async () => {
    await emsStore.updateExpense(editingEmp.value)
    if (!emsStore.hasError) {
        toast.success('Expense updated successfully.');
        router.push('/')
    }else{
        toast.error('Failed to update expense.');
    }
}

const cancelEdit = () => {
    router.push('/')
    emsStore.clearErrors()
}

onMounted(async () => {
    console.log(props.expenseId);
    const emp = emsStore.empList.find((t) => t.expenseId === +props.expenseId);
    if (emp) {
        editingEmp.value = { ...emp }
    } else {
        router.push('/')
    }
})
</script>
<template>
    <section id="emp-edit">
        <h2>Update Expense</h2>
        <div v-if="emsStore.error" class="error-message"> {{ emsStore.error }} </div>
        <EmsForm v-if="editingEmp" :loading="emsStore.loading" v-model:emp="editingEmp" v-model:validationErrors="emsStore.validationErrors" form-label="Update: Expense" submit-label="Update Expense" reset-label="Cancel" @submit="updateExpense" @reset="cancelEdit" />
    </section>
</template>
<style scoped>
.error-message {
    color: red;
    margin-bottom: 15px;
}
</style>
