<template>
    <table v-if="empList && empList.length">
        <thead>
            <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="emp in empList" :key="emp.expenseId">
                <td>{{ emp.title }} </td>
                <td>{{ emp.amount }}</td>
                <td>{{ emp.category }}</td>
                <td>{{ emp.updatedDate }}</td>
                <td><button :aria-busy="loading" :disabled="loading" @click="() => editHandler(emp.expenseId)">Edit</button></td>
                <td><button :aria-busy="loading" :disabled="loading" @click="() => deleteHandler(emp.expenseId)">Delete</button></td>
            </tr>
        </tbody>
    </table>
    <label v-else="empList && empList.length ==0">No Records Found</label>
</template>
<script setup>
const props = defineProps([
    "empList",
    "loading"
]);

const emit = defineEmits(['editClick', 'removeClick'])

const editHandler = (id) => {
    emit('editClick', id);
}
const deleteHandler = (id) => {
    emit('removeClick', id);
}
</script>
<style scoped></style>