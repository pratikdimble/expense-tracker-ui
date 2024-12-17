<template>
    <form @submit.prevent="submitHandler">
        <fieldset>
            <legend>{{ formLabel }}</legend>
                <InputWithError inputId="Title" label="Title" v-model:task="emp.title" v-model:error="validationErrors.title" placeholder="Title (5-100 chars)" />
                <InputWithError inputId="Category" label="Category" v-model:task="emp.category" v-model:error="validationErrors.category" placeholder="Category" />
                <!-- <select  v-model:task="emp.category"   
                    :placeholder="'Choose an option'"
                    :options="dropdownOptions"
                    class="select"
                    :class="{'input-error': hasError}"
                    :errorMessage="'You must select an option'"/> -->
                  <!-- <select v-model:task="emp.category" class="dropdown-container">
                      <option disabled value="00" selected>Please select a department</option>
                      <option value="1">Food</option>
                      <option value="2">Transport</option>
                      <option value="3">Utilities</option>
                      <option value="4">Entertainment</option>
                      <option value="5">Miscellaneous</option>
                  </select> -->
              <!-- </InputWithError> -->
                <!-- <InputWithError inputId="Address" label="Address" v-model:task="emp.address" v-model:error="validationErrors.address" placeholder="Address (10-200 chars)" /> -->
                <InputWithError inputId="Amount" label="Amount" v-model:task="emp.amount" v-model:error="validationErrors.amount" placeholder="Amount" type="number"/>
                <InputWithError inputId="UpdatedDate" label="UpdatedDate" v-model:task="emp.updatedDate" v-model:error="validationErrors.updatedDate" type="date" />
            </fieldset>
        <fieldset class="grid">
            <button type="submit" class="outline" :aria-busy="loading" :disabled="loading">{{submitLabel}}</button>
            <button type="button" class="secondary"  :aria-busy="loading" :disabled="loading" @click="resetHandler">{{resetLabel}}</button>
        </fieldset>
    </form>
</template>

<script setup>
import InputWithError from './InputWithError.vue';
import { computed, ref } from 'vue'

const emp = defineModel('emp')
const validationErrors = defineModel('validationErrors')
// const loading = defineModel('loading')
const props = defineProps([
  "loading",
"formLabel",
"submitLabel",
"resetLabel",
]);
const emit = defineEmits(['submit', 'reset'])

const today = computed(() => new Date().toISOString().split('T')[0])

const dropdownOptions =ref ([
        { label: 'Food', value: 'Food' },
        { label: 'Transport', value: 'Transport' },
        { label: 'Utilities', value: 'Utilities' },
        { label: 'Entertainment', value: 'Entertainment' },
        { label: 'Miscellaneous', value: 'Miscellaneous' },
]);

const submitHandler = () => {
  emit('submit');
}
const resetHandler = () => {
  emit('reset');
}

</script>

<style scoped>

</style>