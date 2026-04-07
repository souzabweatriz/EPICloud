<template>
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
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../composables/useSupabase.js'


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
</style>
