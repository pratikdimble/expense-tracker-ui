<!-- <script setup>
import PicoThemeToggle from '@/components/PicoThemeToggle.vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const logout = () => {
    //cleanup
    userStore.logout()
    // Redirect to login page

    router.replace({ path: "/login" });
}
</script>
<template>
    <header class="container">
        <nav>
            <ul>
                <li>
                    <h1>Employee Management System App </h1>
                </li>
            </ul>
            <ul>
                <li>
                    <RouterLink to="/" exact-active-class="active"> Employee List </RouterLink>
                </li>
                <li>
                    <RouterLink to="/add" exact-active-class="active"> Add Employee </RouterLink>
                </li>
                <li>
                    <RouterLink to="#" exact-active-class="active" @click="logout"> Logout </RouterLink>
                </li>
                <li>
                    <PicoThemeToggle />
                </li> 
            </ul>
        </nav>
    </header>
</template>
<style scoped></style> -->
<script setup>
import PicoThemeToggle from '@/components/PicoThemeToggle.vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const logout = () => {
    // Cleanup
    userStore.logout();
    // Redirect to login page
    router.replace({ path: "/login" });
}
</script>

<template>
    <div class="app-container">
        <!-- Header Section -->
        <header class="header">
            <h1>Expense Management</h1>
        </header>

        <!-- Main Content Section -->
        <div class="main-content">
            <div class="sidebar">
                <ul>
                    <li>
                        <RouterLink to="/" exact-active-class="active">My Expenses</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/add" exact-active-class="active">Add Expense</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/summary" exact-active-class="active">Monthly Summary</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="#" exact-active-class="active" @click="logout">Logout</RouterLink>
                    </li>
                </ul>
            </div>   
        </div>
    </div>
</template>

<style scoped>
/* App container styles */
.app-container {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Full screen height */
}

/* Header styles - Fixed at the top */
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #007bff; /* Blue background for header */
    color: white;
    padding: 10px 20px;
    text-align: center;
    z-index: 10; /* Make sure header stays on top of other elements */
}

.header h1 {
    font-size: 36px;
    margin: 0;
}

/* Main content section with flex layout */
.main-content {
    display: flex;
    flex-grow: 1;
    margin-top: 120px; /* Space for the fixed header */
    padding-left: 250px; /* Space for the fixed sidebar */
    width: 100%;
}

/* Sidebar styles - Fixed on the left */
.sidebar {
    position: fixed;
    top: 70px; /* Push down below the fixed header */
    left: 0;
    width: 250px;
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    height: calc(100vh - 70px); /* Full height minus the header */
    z-index: 5;
}

.sidebar ul {
    list-style-type: none;
    padding: 0;
}

.sidebar ul li {
    margin-bottom: 15px;
}

.sidebar ul li a {
    text-decoration: none;
    font-size: 18px;
    color: #333;
    display: block;
    padding: 10px;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.sidebar ul li a:hover {
    background-color: #007bff;
    color: white;
}

/* Content area styles */


.table-container {
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.table-container h2 {
    font-size: 28px;
    margin-bottom: 20px;
    color: #333;
}

.employee-table {
    width: 100%;
    border-collapse: collapse;
}

.employee-table th, .employee-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.employee-table th {
    background-color: #f4f4f4;
    color: #333;
}

.employee-table tr:hover {
    background-color: #f9f9f9;
}

.employee-table button {
    padding: 6px 12px;
    margin-right: 5px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 4px;
}

.employee-table button:hover {
    background-color: #0056b3;
}
</style>
