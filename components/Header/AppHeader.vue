<template>
<header class="header">
    <div class="header-content">
    <div class="header-spacer">
    <img src="/Image/epicloud.png" alt="Logo do EpiCloud" class="logo" />
    <p class="app-title">EPI<span class="app-title-span">Cloud</span></p>
    </div>
    <nav class="nav">
        <router-link class="nav-link" to="/">Home</router-link>
        <router-link class="nav-link" to="/setores">Setores</router-link>
        <router-link class="nav-link" to="/epis">EPIs</router-link>
        <router-link class="nav-link" to="/sobre">Sobre</router-link>
    </nav>
    <button class="login-button" @click="router.push('/login')">Entrar</button>
    </div>
</header>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style>
.header {
    width: 100%;
    min-height: 5.2rem;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
    background:
        radial-gradient(circle at 20% -10%, rgba(80, 74, 141, 0.3), transparent 45%),
        radial-gradient(circle at 85% 15%, rgba(31, 72, 131, 0.18), transparent 42%),
        linear-gradient(180deg, #080713 0%, #05040f 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.55rem 1.6rem;
}

.logo {
    width: 4.8rem;
    height: 4.8rem;
}

.header-spacer {
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.app-title{
    font-size: 1.2rem;
    color: #E1D3E3;
    font-weight: bolder;
}

.app-title-span {
    color: #ffffff;
    font-weight: 500;
}

.header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    width: min(100%, 1200px);
    gap: 2rem;
}

.nav{
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    white-space: nowrap;
    gap: 1.5rem;
}

.nav-link {
    text-decoration: none;
    color: rgb(255, 255, 255);
    font-size: 0.92rem;
    font-weight: 500;
    margin-right: 0;
}

.nav-link:hover {
    color: rgb(212, 193, 219);
}

.login-button{
    font-weight: 500;
    width: 6.9rem;
    height: 2.5rem;
    border-radius: 0.8rem;
    background: linear-gradient(90deg, #E1D3E3 0%, #E1D3E3 40%, #7C747D 100%);
    background-size: 200% 200%;
    background-position: 0% 50%;
    border: none;
    color: black;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.341);
    cursor: pointer;
    transition: transform 0.2s ease;
    font-size: 0.88rem;
}

.login-button:hover {
    animation: gradientMove 2s linear infinite;
    transform: translateY(-1px);
}


@keyframes gradientMove {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

@media (max-width: 980px) {
    .header {
        min-height: auto;
        padding: 0.8rem 1rem;
    }

    .header-content {
        justify-content: space-between;
        gap: 0.7rem;
    }

    .nav {
        gap: 0.7rem;
        justify-content: flex-start;
    }
}

@media (max-width: 768px) {
    .header {
        padding: 0.7rem 0.8rem;
    }

    .logo {
        width: 4rem;
        height: 4rem;
    }

    .app-title {
        font-size: 1.06rem;
    }

    .header-content {
        gap: 0.55rem;
    }

    .nav-link {
        font-size: 0.8rem;
    }

    .login-button {
        width: 5.6rem;
        height: 2.05rem;
        font-size: 0.76rem;
    }
}

@media (max-width: 520px) {
    .header {
        padding: 0.6rem 0.6rem;
    }

    .header-content {
        gap: 0.45rem;
    }

    .header-spacer {
        gap: 0.5rem;
    }

    .logo {
        width: 2.8rem;
        height: 2.8rem;
    }

    .app-title {
        font-size: 0.82rem;
    }

    .nav {
        gap: 0.45rem;
        justify-content: flex-start;
    }

    .nav-link {
        font-size: 0.72rem;
    }

    .login-button {
        width: 4.8rem;
        height: 1.9rem;
        font-size: 0.7rem;
    }
}

@media (max-width: 380px) {
    .logo {
        width: 2.5rem;
        height: 2.5rem;
    }

    .app-title {
        font-size: 0.75rem;
    }

    .nav {
        gap: 0.35rem;
    }

    .nav-link {
        font-size: 0.66rem;
    }

    .login-button {
        width: 4.2rem;
        font-size: 0.64rem;
    }
}
</style>
