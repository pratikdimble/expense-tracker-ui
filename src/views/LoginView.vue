<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import { ref } from 'vue';
import { useEmsStore } from '../stores/EmsStore'
import { useToast } from 'vue-toastification';

const toast = useToast();
const userStore = useUserStore();
const router = useRouter();
const userForm = ref({ username: "", password: "" });
const emsStore = useEmsStore()

// const login = async () => {
//     await emsStore.login(userForm.value)
// }
const submitHandler = async() => {
    await emsStore.login(userForm.value)
    // userStore.login({ username: userForm.value.username });
    if(localStorage.getItem("userid") > 0){
        emsStore.error = null
        userStore.loginNew();
        router.replace({ path: "/" });
    } 
    // else
    //     toast.error('Invalid Credentials');

}
</script>
<template>
    <h1>Sign in</h1>
    <form @submit.prevent="submitHandler"> <input type="text" name="login" placeholder="Login" aria-label="Login" autocomplete="username" required="" v-model="userForm.username">
        <input type="password" name="password" placeholder="Password" aria-label="Password" autocomplete="current-password" required="" v-model="userForm.password">
        <!-- <fieldset>
            <label for="remember">
                <input type="checkbox" role="switch" id="remember" name="remember"> Remember me </label>
        </fieldset> -->
        <button type="submit">Login</button>
    </form>
</template>
<style scoped></style>