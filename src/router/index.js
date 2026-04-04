import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { supabase } from '../composables/useSupabase.js'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        alias: '/Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/cadastro',
        name: 'cadastro',
        alias: '/Cadastro',
        component: () => import('../views/Cadastro.vue')
    },
    {
        path: '/epis',
        name: 'epis',
        alias: '/EPIs',
        component: () => import('../views/EPIs.vue')
    },
    {
        path: '/setores',
        name: 'setores',
        alias: ['/Setores', '/setors', '/Setors'],
        component: () => import('../views/Setores.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/sobre',
        name: 'sobre',
        alias: '/Sobre',
        component: () => import('../views/Sobre.vue')
    }
]

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(r => r.meta.requiresAuth);

    const { data: { session } } = await supabase.auth.getSession();

    if (requiresAuth && !session) {
        next('/login');
    } else {
        next();
    }
});

export default router