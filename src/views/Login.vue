<template>
    <AppHeader />
    <main class="auth-page">
        <section class="auth-card">
            <p class="eyebrow">Acesso seguro</p>
            <h1>Entrar na plataforma</h1>
            <p class="subtitle">Use suas credenciais para acessar os modulos de EPIs e setores.</p>

            <form class="auth-form" @submit.prevent="login">
                <label>
                    E-mail
                    <input v-model="email" type="email" placeholder="seuemail@empresa.com" required />
                </label>

                <label>
                    Senha
                    <input v-model="password" type="password" placeholder="********" required />
                </label>

                <button type="submit" :disabled="loading">
                    {{ loading ? 'Entrando...' : 'Entrar' }}
                </button>
            </form>

            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

            <p class="cta-register">
                Nao possui conta?
                <button type="button" class="link-button" @click="router.push('/cadastro')">Criar cadastro</button>
            </p>
        </section>
    </main>
    <AppFooter />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../composables/useSupabase.js'
import AppHeader from '/components/Header/AppHeader.vue'
import AppFooter from '../../components/AppFooter.vue/index.js'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

async function login() {
    loading.value = true
    errorMessage.value = ''

    const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })

    loading.value = false

    if (error) {
        errorMessage.value = 'Nao foi possivel entrar. Verifique e-mail e senha.'
        return
    }

    router.push('/setores')
}
</script>

<style scoped>
.auth-page {
    min-height: calc(100vh - 10rem);
    display: grid;
    place-items: center;
    padding: 2rem 1rem;
    background: radial-gradient(circle at 20% 10%, rgba(43, 138, 200, 0.12), transparent 45%), #f6f9fc;
}

.auth-card {
    width: min(460px, 100%);
    background: #ffffff;
    border: 1px solid #d8e2ee;
    border-radius: 1rem;
    box-shadow: 0 16px 34px rgba(15, 43, 67, 0.13);
    padding: 1.6rem;
}

.eyebrow {
    text-transform: uppercase;
    font-size: 0.74rem;
    letter-spacing: 0.08em;
    color: #2b8ac8;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

h1 {
    color: #153853;
    margin-bottom: 0.4rem;
}

.subtitle {
    color: #4a647b;
    margin-bottom: 1rem;
}

.auth-form {
    display: grid;
    gap: 0.85rem;
}

label {
    display: grid;
    gap: 0.38rem;
    color: #2f4358;
    font-size: 0.92rem;
}

input {
    border: 1px solid #c9d9e8;
    border-radius: 0.65rem;
    padding: 0.72rem 0.8rem;
    font-size: 0.95rem;
    outline: none;
}

input:focus {
    border-color: #2b8ac8;
    box-shadow: 0 0 0 3px rgba(43, 138, 200, 0.18);
}

button[type='submit'] {
    margin-top: 0.3rem;
    border: none;
    border-radius: 0.7rem;
    padding: 0.72rem 1rem;
    background: linear-gradient(90deg, #17486b 0%, #2b8ac8 100%);
    color: #fff;
    font-weight: 700;
    cursor: pointer;
}

button[type='submit']:disabled {
    opacity: 0.7;
    cursor: wait;
}

.error-message {
    margin-top: 0.85rem;
    color: #bd2a2a;
    font-weight: 600;
}

.cta-register {
    margin-top: 1rem;
    color: #3f5f79;
}

.link-button {
    border: none;
    background: transparent;
    color: #2b8ac8;
    font-weight: 700;
    cursor: pointer;
    padding: 0;
    margin-left: 0.25rem;
}
</style>
