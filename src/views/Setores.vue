<template>
    <AppHeader />
    <main class="page-shell">
        <section class="hero-card">
            <p class="eyebrow">Gestao por area</p>
            <h1>Setores monitorados</h1>
            <p>Acompanhe consumo de EPIs por setor e priorize a reposicao com base em risco operacional.</p>
        </section>

        <section class="stats-grid">
            <article class="stat-card">
                <h2>Producao</h2>
                <p class="big">92%</p>
                <span>Conformidade de uso</span>
            </article>
            <article class="stat-card">
                <h2>Almoxarifado</h2>
                <p class="big">74%</p>
                <span>Itens auditados na semana</span>
            </article>
            <article class="stat-card">
                <h2>Manutencao</h2>
                <p class="big">18</p>
                <span>EPIs proximos do vencimento</span>
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
    width: min(1120px, 92%);
    margin: 2rem auto 3rem;
    display: grid;
    gap: 1.1rem;
}

.hero-card,
.stat-card {
    border-radius: 1rem;
    border: 1px solid #d7deea;
    background: linear-gradient(180deg, #f8fafc 0%, #eef4fa 100%);
    box-shadow: 0 12px 28px rgba(12, 20, 38, 0.08);
}

.hero-card {
    padding: 1.5rem;
}

.eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #2b8ac8;
    font-weight: 700;
    font-size: 0.78rem;
    margin-bottom: 0.45rem;
}

h1 {
    color: #123752;
    margin-bottom: 0.35rem;
}

.hero-card p {
    color: #4a647b;
}

.stats-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.stat-card {
    padding: 1.2rem;
}

.stat-card h2 {
    color: #1c425f;
    margin-bottom: 0.4rem;
}

.big {
    font-size: 2rem;
    color: #1f6ca0;
    font-weight: 800;
    margin-bottom: 0.2rem;
}

.stat-card span {
    color: #4f6b83;
    font-size: 0.9rem;
}

@media (max-width: 900px) {
    .stats-grid {
        grid-template-columns: 1fr;
    }
}
</style>
