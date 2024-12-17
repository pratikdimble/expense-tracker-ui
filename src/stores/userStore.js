import { defineStore } from 'pinia';
import { computed } from 'vue';

import { ref } from 'vue';

const usePrivateState = defineStore('secret-store', () => {
    const username = ref(null)
    const userid = ref(null)
    return { username, userid }
})

export const useUserStore = defineStore('userStore', () => {

    const privateState = usePrivateState()

    const load = (userForm) => {
        console.log("userid:" + localStorage.getItem("userid"))
        const un = localStorage.getItem("username")
        console.log("username:" + un)
        if (un) {
            privateState.username = un;
        }
        const id = localStorage.getItem("userid")
        if (id) {
            privateState.userid = id;
        }
    }

    const loginNew = () => {
            privateState.userid = localStorage.getItem("userid");
    }

    const login = (userForm) => {
        
        if (userForm.username) {
            localStorage.setItem("username", userForm.username);
            privateState.username = userForm.username;
        } else {
            throw "Error: UN is null"
        }
    }
    const logout = () => {
        privateState.username = null;
        privateState.userid = null;
        localStorage.removeItem("username")
        localStorage.removeItem("userid")
    }
    const isAuthenticated = computed(() => {
        // const result = !!privateState.username
        const result = !!privateState.userid
        return result
    })

    const username = computed(() => privateState.username)
    const userid = computed(() => privateState.userid)

    return { load, login, loginNew, logout, isAuthenticated, username }
});

