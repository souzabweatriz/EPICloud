<template>
    <div class="sidebar-wrapper">
        <aside class="sidebar">
            <div class="logo-wrap">
                <img src="../public/Image/logo.png" alt="logo do site" class="logo-img">
            </div>

            <nav class="menu">
                <RouterLink to="/dashboard/funcionario" class="menu-item" active-class="active">
                    <span class="item-icon"><i class="ti ti-users"></i></span>
                    <span class="item-label">Funcionários</span>
                </RouterLink>
                <RouterLink to="/dashboard/entregas" class="menu-item" active-class="active">
                    <span class="item-icon"><i class="ti ti-package"></i></span>
                    <span class="item-label">Entregas de EPI</span>
                </RouterLink>
                <RouterLink to="/dashboard/estoque" class="menu-item" active-class="active">
                    <span class="item-icon"><i class="ti ti-building-warehouse"></i></span>
                    <span class="item-label">Estoque</span>
                </RouterLink>
                <RouterLink to="/dashboard/relatorio" class="menu-item" active-class="active">
                    <span class="item-icon"><i class="ti ti-chart-bar"></i></span>
                    <span class="item-label">Relatório</span>
                </RouterLink>
                <RouterLink to="/dashboard/cadastro" class="menu-item" active-class="active">
                    <span class="item-icon"><i class="ti ti-shield-check"></i></span>
                    <span class="item-label">Cadastro de EPI</span>
                </RouterLink>
            </nav>

            <button @click="sair" class="botao-sair">
                <i class="ti ti-logout"></i>
                <span>Sair</span>
            </button>
        </aside>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useSupabase } from '../src/composables/useSupabase'

const router = useRouter()
const { supabase } = useSupabase()
const LOGIN_SESSION_KEY = 'epicloud_login_session'

async function sair() {
    try {
        sessionStorage.removeItem(LOGIN_SESSION_KEY)
        router.push('/login')
    } catch (error) {
        console.error('Erro ao sair:', error)
    }
}
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

* {
    box-sizing: border-box;
}

.sidebar-wrapper {
    width: 16rem;
    min-height: 100vh;
    flex-shrink: 0;
}

.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 16rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1rem;
    background: #fff;
    border-right: 1px solid #e8eef4;
    box-shadow: 2px 0 16px rgba(18, 55, 82, 0.06);
    z-index: 100;
}

/* ── Logo ── */
.logo-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 1.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #f0f4f8;
}

.logo-img {
    height: 4rem;
    width: auto;
    object-fit: contain;
}

/* ── Nav ── */
.menu {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
    margin-top: 0.5rem;
}

.menu-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0.9rem;
    border-radius: 0.75rem;
    text-decoration: none;
    color: #7a95a8;
    font-weight: 600;
    font-size: 0.88rem;
    transition: color 0.18s, background 0.18s;
}

.item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.9rem;
    height: 1.9rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    flex-shrink: 0;
    transition: background 0.18s, color 0.18s;
}

.item-label {
    flex: 1;
    white-space: nowrap;
}

.menu-item:hover {
    color: #1a6fa8;
    background: #f0f7fd;
}

.menu-item:hover .item-icon {
    color: #1a6fa8;
}

.menu-item.active,
.menu-item.router-link-active {
    color: #1a6fa8;
    background: #e8f3fb;
    font-weight: 700;
}

.menu-item.active .item-icon,
.menu-item.router-link-active .item-icon {
    background: rgba(26, 111, 168, 0.12);
    color: #1a6fa8;
}

/* Active left bar */
.menu-item.active::before,
.menu-item.router-link-active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 20%;
    height: 60%;
    width: 3px;
    border-radius: 0 3px 3px 0;
    background: #1a6fa8;
}

/* ── Botão sair ── */
.botao-sair {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    width: 100%;
    margin-top: 1rem;
    padding: 0.78rem 1rem;
    border: 1px solid #f0d0d0;
    border-radius: 0.75rem;
    background: #fff8f8;
    color: #c0504040;
    color: #b54040;
    font-weight: 700;
    font-size: 0.88rem;
    cursor: pointer;
    transition: background 0.18s, color 0.18s, border-color 0.18s;
}

.botao-sair i {
    font-size: 1rem;
}

.botao-sair:hover {
    background: #fff0f0;
    color: #8a1f1f;
    border-color: #f0b0b0;
}

/* ── Responsive ── */
@media (max-width: 900px) {
    .sidebar-wrapper {
        width: 14rem;
    }
    .sidebar {
        width: 14rem;
    }
}

@media (max-width: 640px) {
    .sidebar-wrapper {
        width: 4.5rem;
    }

    .sidebar {
        width: 4.5rem;
        padding: 1.25rem 0.6rem;
        align-items: center;
    }

    .logo-wrap {
        padding-bottom: 1rem;
    }

    .logo-img {
        height: 2.2rem;
    }

    .menu {
        align-items: center;
        width: 100%;
    }

    .menu-item {
        width: 3rem;
        height: 3rem;
        justify-content: center;
        padding: 0;
        border-radius: 0.75rem;
        gap: 0;
    }

    .item-label {
        display: none;
    }

    .item-icon {
        width: 1.75rem;
        height: 1.75rem;
    }

    .menu-item.active::before,
    .menu-item.router-link-active::before {
        top: 0;
        height: 100%;
    }

    .botao-sair {
        width: 3rem;
        height: 3rem;
        padding: 0;
        border-radius: 0.75rem;
    }

    .botao-sair span {
        display: none;
    }

    .botao-sair i {
        font-size: 1.1rem;
    }
}
</style>