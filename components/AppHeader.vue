<template>
<header class="header">
    <div class="header-spacer">
        <div class="logo">
            <img src="/Image/logo.png" alt="Logo do EpiCloud" class="image-logo" />
            <p class="app-title">EPI<span class="app-title-span">Cloud</span></p>
        </div>
    </div>
    <nav class="nav">
        <router-link class="nav-link" to="/">Início</router-link>
        <router-link class="nav-link" :to="{ path: '/', hash: '#contato' }">Contato</router-link>
        <router-link class="nav-link" :to="{ path: '/', hash: '#sobre' }">Sobre</router-link>
    </nav>
    <button class="login-button" @click="router.push('/Login')">Entrar</button>
</header>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<style>
:root {
    --azul-profundo-seguranca: #1A535C;
    --ciano-suave: #4ECDC4;
    --cinza-neutro-claro: #6C757D;
    --fundo-minimalista: #F4F7F6;
    --preto-tipografico: #343A40;
}

.header{
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
    padding: 0 1.5rem;
    width: 100%;
    height: 4.5rem;
    top: 0;
    left: 0;
    z-index: 1100;
    border-radius: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.96));
    border-bottom: 0.0625rem solid rgba(108, 117, 125, 0.18);
    box-shadow: 0 0.5rem 1.25rem rgba(52, 58, 64, 0.08);
    backdrop-filter: blur(0.35rem);
    -webkit-backdrop-filter: blur(0.35rem);
    overflow: hidden;
}

.header::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(78, 205, 196, 0.08) 50%, transparent 100%);
    transform: translateX(-100%);
    animation: headerGlow 7s ease-in-out infinite;
    pointer-events: none;
}

.header:hover {
    box-shadow: 0 0.7rem 1.45rem rgba(52, 58, 64, 0.12);
    transform: translateY(0.05rem);
    transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.image-logo{
    width: 4rem;
    height: 2.5rem;
}

.logo{
    display: flex;
    align-items: center;
    gap: 0.45rem;
}

.header-spacer {
    display: flex;
    align-items: center;
}

.app-title {
    color: var(--azul-profundo-seguranca);
    font-weight: 800;
    font-size: 1.08rem;
    line-height: 1;
}

.app-title-span {
    color: var(--preto-tipografico);
}

.nav{
    display: flex;
    gap: 1rem;
}

.nav-link {
    text-decoration: none;
    color: var(--preto-tipografico);
    font-weight: 600;
    font-size: 0.92rem;
    transition: color 0.2s ease;
}

.nav-link:hover {
    color: var(--azul-profundo-seguranca);
}

.nav-link::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.25rem;
    width: 100%;
    height: 0.14rem;
    border-radius: 999rem;
    background: linear-gradient(90deg, var(--azul-profundo-seguranca), transparent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.22s ease;
}

.nav-link:hover::after {
    transform: scaleX(1);
}

.login-button {
    border: none;
    border-radius: 0.4rem;
    width: 5rem;
    height: 2rem;
    background: var(--azul-profundo-seguranca);
    color: var(--fundo-minimalista);
    font-weight: 700;
    font-size: 0.84rem;
    cursor: pointer;
    transition: background 0.2s ease, opacity 0.2s ease;
}

.login-button:hover {
    background: var(--azul-profundo-seguranca);
    opacity: 0.92;
}

@keyframes headerGlow {
    0%,
    70% {
        transform: translateX(-100%);
        opacity: 0;
    }

    78% {
        opacity: 1;
    }

    100% {
        transform: translateX(100%);
        opacity: 0;
    }
}

@media (max-width: 760px) {
    .header {
        width: 100%;
        height: 3.75rem;
        top: 0;
        padding: 0 1rem;
        gap: 0.55rem;
    }

    .image-logo {
        width: 2.5rem;
        height: 1.65rem;
    }

    .app-title {
        font-size: 0.8rem;
    }

    .nav {
        gap: 0.5rem;
    }

    .nav-link {
        font-size: 0.74rem;
    }

    .nav-link::after {
        bottom: -0.18rem;
    }

    .login-button {
        height: 1.5rem;
        font-size: 0.68rem;
    }
}
</style>
