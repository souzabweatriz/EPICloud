<template>
    <AppHeader />
    <main class="page-shell">
        <section class="hero-card">
            <p class="eyebrow">Plataforma EPICloud</p>
            <h1>Gestao de EPIs com foco em seguranca, compliance e produtividade.</h1>
            <p>
                Centralize cadastro, distribuicao e rastreabilidade dos equipamentos em um fluxo unico,
                com dados confiaveis para auditoria e tomada de decisao.
            </p>
        </section>

        <section class="grid-three">
            <article class="info-card">
                <h2>Rastreabilidade</h2>
                <p>Historico completo de entrega, validade e reposicao por colaborador e setor.</p>
            </article>
            <article class="info-card">
                <h2>Conformidade</h2>
                <p>Padronizacao de registros e suporte para controles alinhados com exigencias legais.</p>
            </article>
            <article class="info-card">
                <h2>Performance</h2>
                <p>Visao operacional em tempo real para reduzir perdas e acelerar reposicoes.</p>
            </article>
        </section>
    </main>
    <AppFooter />
</template>

<script setup>
import AppHeader from '/components/Header/AppHeader.vue'
import AppFooter from '../../components/AppFooter.vue'
</script>

<style scoped>
.page-shell {
    min-height: calc(100vh - 10rem);
    width: min(1120px, 92%);
    margin: 2rem auto 3rem;
    display: grid;
    gap: 1.4rem;
}

.hero-card,
.info-card {
    border-radius: 1rem;
    border: 1px solid #d7deea;
    background: linear-gradient(180deg, #f8fafc 0%, #eef4fa 100%);
    box-shadow: 0 12px 28px rgba(12, 20, 38, 0.08);
}

.hero-card {
    padding: 2rem;
}

.hero-card h1 {
    color: #0f2b43;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    line-height: 1.15;
    margin-bottom: 0.8rem;
}

.hero-card p {
    color: #3a5167;
    max-width: 70ch;
}

.eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #2b8ac8;
    font-weight: 700;
    font-size: 0.78rem;
    margin-bottom: 0.65rem;
}

.grid-three {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.info-card {
    padding: 1.3rem;
}

.info-card h2 {
    color: #153853;
    margin-bottom: 0.5rem;
}

.info-card p {
    color: #49657e;
}

@media (max-width: 900px) {
    .grid-three {
        grid-template-columns: 1fr;
    }
}
</style>
