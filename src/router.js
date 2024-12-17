import { createRouter, createMemoryHistory  } from 'vue-router'
import EmsListView from './views/EmsListView.vue'
import EmsAddView from './views/EmsAddView.vue'
import EmsEditView from './views/EmsEditView.vue'
import LoginView from './views/LoginView.vue'
import SignupView from './views/SignupView.vue'
import AuthLayout from './layout/AuthLayout.vue'
import HomeLayout from './layout/HomeLayout.vue'

import { useUserStore } from './stores/userStore';
import EmsSearchView from './views/EmsSearchView.vue'

function isLoggedIn() {
    const userStore = useUserStore()
    return userStore.isAuthenticated
}

const routes = [
    {
        path: "/login",
        component: AuthLayout,
        children: [{ path: "", component: LoginView }],
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next({ path: "/" });
            } else {
                next();
            }
        }
    },
    {
        path: "/signup",
        component: AuthLayout,
        children: [{ path: "", component: SignupView }],
    },
    {
        path: "/",
        component: HomeLayout,
        children:
            [{
                path: '/',
                name: 'EmployeeList',
                component: EmsListView,
                meta: { requiresAuth: true }
            },
            {
                path: '/add',
                name: 'EmployeeAdd',
                component: EmsAddView,
                meta: { requiresAuth: true }
            },
            {
                path: '/edit/:expenseId',
                name: 'EmployeeEdit',
                component: EmsEditView,
                props: true,
            },
            {
                path: '/search',
                name: 'EmployeeSearch',
                component: EmsSearchView,
                props: true,
            }
        ],
        meta: { requiresAuth: true }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        redirect: '/'
    },
]


const router = createRouter({
    history: createMemoryHistory (),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isLoggedIn()) {
        next({ path: "/login" });
    } else {
        next();
    }
});

export default router