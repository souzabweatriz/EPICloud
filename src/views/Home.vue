<template>
    <div>
        <AppHeader />
    </div>
    <div class="home-container">

        <!-- BANNER -->
        <section id="inicio" class="banner-wrap">
            <img class="banner" src="../../public/Image/bannerWebsite.png" alt="Banner do Website" />
            <div class="banner-overlay" aria-hidden="true"></div>
            <div class="banner-text">
                <span class="banner-eyebrow">Gestão em nuvem para operações que não podem parar</span>
                <h1 class="banner-title">Gestão em nuvem,<br /><em>segurança em tempo real</em></h1>
                <p class="banner-lead">
                    Centralize o controle de EPIs, acompanhe entregas e leve mais clareza para a rotina da sua equipe.
                </p>
                <a href="#sobre" class="cta-btn">Conheça a EPICloud</a>
            </div>
        </section>

        <!-- MARQUEE -->
        <div class="marquee-wrap" aria-hidden="true">
            <div class="marquee-track">
                <span class="marquee-pill">Segurança elevada à nuvem</span>
                <span class="marquee-dot">◆</span>
                <span class="marquee-pill">Gestão que protege vidas</span>
                <span class="marquee-dot">◆</span>
                <span class="marquee-pill">Decisões mais inteligentes</span>
                <span class="marquee-dot">◆</span>
                <span class="marquee-pill">Controle em tempo real</span>
                <span class="marquee-dot">◆</span>
                <span class="marquee-pill">Eficiência que cresce</span>
                <span class="marquee-dot">◆</span>
                <span class="marquee-pill">Processos mais ágeis</span>
                <span class="marquee-dot">◆</span>
                <!-- duplicate -->
                <span class="marquee-pill">Segurança elevada à nuvem</span>
                <span class="marquee-dot">◆</span>
                <span class="marquee-pill">Gestão que protege vidas</span>
                <span class="marquee-dot">◆</span>
                <span class="marquee-pill">Decisões mais inteligentes</span>
                <span class="marquee-dot">◆</span>
                <span class="marquee-pill">Controle em tempo real</span>
                <span class="marquee-dot">◆</span>
                <span class="marquee-pill">Eficiência que cresce</span>
                <span class="marquee-dot">◆</span>
                <span class="marquee-pill">Processos mais ágeis</span>
                <span class="marquee-dot">◆</span>
            </div>
        </div>

        <!-- SECTION 1 -->
        <section class="feature-section">
            <div class="feature-image-wrap">
                <img src="../../public/Image/oculos.png" alt="Óculos de proteção" class="feature-img" />
            </div>
            <div class="feature-text">
                <span class="section-label">Ciclo de vida completo</span>
                <h2>Controle total dos equipamentos de proteção</h2>
                <p>Garanta mais segurança, organização e eficiência na gestão de EPIs da sua empresa. Nosso sistema
                    facilita o registro, acompanhamento e gerenciamento de todos os equipamentos fornecidos aos
                    colaboradores.</p>
            </div>
        </section>

        <!-- SECTION 2 -->
        <section class="feature-section reverse">
            <div class="feature-image-wrap">
                <img src="../../public/Image/capacete.png" alt="Capacete de segurança" class="feature-img" />
            </div>
            <div class="feature-text">
                <span class="section-label">Rastreabilidade</span>
                <h2>Rastreabilidade completa, segurança garantida</h2>
                <p>Acompanhe cada etapa do ciclo de vida dos EPIs, desde a aquisição até a entrega e descarte.
                    Rastreabilidade total com precisão, proporcionando mais segurança para seus colaboradores e
                    tranquilidade para sua empresa.</p>
            </div>
        </section>

        <!-- BENEFITS -->
        <section id="sobre" class="benefits-section">
            <div class="benefits-header">
                <span class="section-label">Diferenciais</span>
                <h2>Por que escolher a EPICloud?</h2>
                <p class="benefits-subtitle">Benefícios exclusivos para empresas que querem evoluir a gestão de EPIs.
                </p>
            </div>

            <div class="benefits-grid">
                <article class="benefit-card">
                    <div class="benefit-icon"><i class="pi pi-box"></i></div>
                    <h3>Agregação de Valor</h3>
                    <p>Destaque sua operação com rastreabilidade inteligente e dados acionáveis.</p>
                </article>
                <article class="benefit-card">
                    <div class="benefit-icon"><i class="pi pi-bolt"></i></div>
                    <h3>Implementação Rápida</h3>
                    <p>Fluxo de implantação simples, sem travar a rotina da sua equipe.</p>
                </article>
                <article class="benefit-card">
                    <div class="benefit-icon"><i class="pi pi-chart-line"></i></div>
                    <h3>Escala com Controle</h3>
                    <p>Ganhe visibilidade para crescer sem perder padrão operacional.</p>
                </article>
                <article class="benefit-card">
                    <div class="benefit-icon"><i class="pi pi-users"></i></div>
                    <h3>Suporte Dedicado</h3>
                    <p>Conte com acompanhamento próximo para cada etapa da sua jornada.</p>
                </article>
                <article class="benefit-card">
                    <div class="benefit-icon"><i class="pi pi-chart-bar"></i></div>
                    <h3>Análise de Desempenho</h3>
                    <p>Obtenha insights valiosos sobre a eficácia de sua gestão de EPIs.</p>
                </article>
                <article class="benefit-card">
                    <div class="benefit-icon"><i class="pi pi-check"></i></div>
                    <h3>Conformidade Regulatória</h3>
                    <p>Garanta o cumprimento das normas e regulamentações vigentes.</p>
                </article>
            </div>
        </section>

        <!-- HOW IT WORKS -->
        <section class="how-section">
            <div class="how-header">
                <span class="section-label">Como funciona</span>
                <h2>Do cadastro ao controle, em minutos</h2>
                <p class="how-subtitle">Um fluxo simples e intuitivo para colocar sua equipe no controle total dos EPIs.
                </p>
            </div>

            <div class="how-steps">
                <div class="how-step">
                    <div class="step-number">01</div>
                    <div class="step-connector" aria-hidden="true"></div>
                    <div class="step-icon"><i class="pi pi-user-plus"></i></div>
                    <h3>Cadastre sua empresa</h3>
                    <p>Crie sua conta, adicione colaboradores e configure os departamentos em poucos minutos.</p>
                </div>
                <div class="how-step">
                    <div class="step-number">02</div>
                    <div class="step-connector" aria-hidden="true"></div>
                    <div class="step-icon"><i class="pi pi-box"></i></div>
                    <h3>Registre os EPIs</h3>
                    <p>Cadastre todos os equipamentos com validade, CA e especificações. O sistema organiza tudo
                        automaticamente.</p>
                </div>
                <div class="how-step">
                    <div class="step-number">03</div>
                    <div class="step-connector" aria-hidden="true"></div>
                    <div class="step-icon"><i class="pi pi-send"></i></div>
                    <h3>Realize entregas</h3>
                    <p>Registre entregas para cada colaborador com assinatura digital e histórico completo de
                        recebimentos.</p>
                </div>
                <div class="how-step">
                    <div class="step-number">04</div>
                    <div class="step-connector last" aria-hidden="true"></div>
                    <div class="step-icon"><i class="pi pi-chart-bar"></i></div>
                    <h3>Monitore em tempo real</h3>
                    <p>Acompanhe vencimentos, estoques e conformidade pelo dashboard com alertas automáticos.</p>
                </div>
            </div>
        </section>

    </div>
    <AppFooter />
</template>

<script setup>
import AppHeader from '/components/AppHeader.vue'
import AppFooter from '/components/AppFooter.vue'
</script>

<style scoped>
/* ── TOKENS ─────────────────────────────────────────── */
:root {
    --teal-dark: #0f3d47;
    --teal-mid: #1A535C;
    --teal-light: #4ECDC4;
    --teal-pale: #e3f2f4;
    --ink: #123752;
    --ink-soft: #5f6775;
    --ink-muted: #5f6775;
    --surface: #f4f9fb;
    --white: #ffffff;
    --radius-lg: 1.5rem;
    --radius-md: 1rem;
    --shadow-card: 0 8px 32px rgba(15, 61, 71, 0.10);
    --shadow-lift: 0 18px 48px rgba(15, 61, 71, 0.18);
}

/* ── RESET / BASE ────────────────────────────────────── */
*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background:
        radial-gradient(ellipse 70% 32% at 10% 0%, rgba(78, 205, 196, .10) 0%, transparent 70%),
        radial-gradient(ellipse 60% 28% at 90% 8%, rgba(26, 83, 92, .09) 0%, transparent 70%),
        linear-gradient(180deg, #ffffff 0%, #f4f9fb 60%, #eaf4f8 100%);
    padding-top: 4.5rem;
    /* header clearance */
}

/* ── BANNER ──────────────────────────────────────────── */
.banner-wrap {
    position: relative;
    width: 100%;
    min-height: 30rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.banner {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.banner-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(5, 15, 20, .92) 0%, rgba(10, 40, 50, .88) 55%, rgba(15, 61, 71, .82) 100%);
}

.banner-text {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: .75rem;
    width: min(100%, 56rem);
    padding: 3rem 2.5rem;
    color: #fff;
}

.banner-eyebrow {
    font-size: .75rem;
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: #9ee7df;
}

.banner-title {
    font-size: clamp(1.9rem, 4.5vw, 3.4rem);
    line-height: 1.08;
    font-weight: 800;
    color: #fff;
    text-shadow: 0 4px 24px rgba(0, 0, 0, .6);
}

.banner-title em {
    font-style: normal;
    color: #4ECDC4;
}

.banner-lead {
    max-width: 38rem;
    font-size: clamp(.9rem, 1.6vw, 1.05rem);
    line-height: 1.65;
    color: #e8f4f6;
    margin-top: .25rem;
}

.cta-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: .75rem;
    padding: .8rem 1.8rem;
    background: linear-gradient(135deg, #1A535C 0%, #0f3d47 100%);
    color: #fff;
    font-weight: 700;
    font-size: .95rem;
    border-radius: 999px;
    text-decoration: none;
    border: 1.5px solid rgba(78, 205, 196, .35);
    box-shadow: 0 6px 20px rgba(15, 61, 71, .35);
    transition: transform .25s ease, box-shadow .25s ease, background .25s ease;
}

.cta-btn:hover {
    transform: translateY(-2px);
    background: linear-gradient(135deg, #4ECDC4 0%, #1A535C 100%);
    box-shadow: 0 10px 30px rgba(78, 205, 196, .32);
}

/* ── MARQUEE ─────────────────────────────────────────── */
.marquee-wrap {
    width: 100%;
    overflow: hidden;
    padding: 1.2rem 0;
    mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
}

.marquee-track {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: max-content;
    animation: marquee 28s linear infinite;
}

.marquee-pill {
    background: rgba(255, 255, 255, .85);
    border: 1.5px solid rgba(26, 83, 92, .18);
    color: #0f3d47;
    font-size: .88rem;
    font-weight: 600;
    padding: .5rem 1.1rem;
    border-radius: 999px;
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba(15, 61, 71, .07);
}

.marquee-dot {
    color: #4ECDC4;
    font-size: .6rem;
    flex-shrink: 0;
}

@keyframes marquee {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-50%);
    }
}

/* ── SECTION LABEL ───────────────────────────────────── */
.section-label {
    display: inline-block;
    font-size: .72rem;
    font-weight: 700;
    letter-spacing: .13em;
    text-transform: uppercase;
    color: #1A535C;
    background: #e3f2f4;
    padding: .3rem .85rem;
    border-radius: 999px;
}

/* ── FEATURE SECTIONS ────────────────────────────────── */
.feature-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 3rem;
    width: min(100%, 72rem);
    padding: 4rem 2rem;
}

.feature-section.reverse {
    direction: rtl;
}

.feature-section.reverse>* {
    direction: ltr;
}

.feature-image-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #e3f2f4 0%, #e3f2f4 100%);
    border-radius: var(--radius-lg);
    padding: 2.5rem;
    min-height: 22rem;
}

.feature-img {
    width: 100%;
    max-width: 18rem;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 16px 28px rgba(15, 61, 71, .18));
    transition: transform .4s ease;
}

.feature-img:hover {
    transform: scale(1.03) translateY(-4px);
}

.feature-text {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.feature-text h2 {
    font-size: clamp(1.5rem, 2.4vw, 2.1rem);
    font-weight: 800;
    color: #123752;
    line-height: 1.15;
}

.feature-text p {
    font-size: clamp(.9rem, 1.4vw, 1rem);
    color: #5f6775;
    line-height: 1.7;
    max-width: 36rem;
}

/* ── BENEFITS ────────────────────────────────────────── */
.benefits-section {
    width: 100%;
    padding: 4rem 1.5rem 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
    background: linear-gradient(180deg, transparent 0%, rgba(214, 240, 238, .35) 40%, transparent 100%);
}

.benefits-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .75rem;
    text-align: center;
}

.benefits-header h2 {
    font-size: clamp(1.65rem, 3vw, 2.3rem);
    font-weight: 800;
    color: #123752;
    line-height: 1.1;
}

.benefits-subtitle {
    font-size: clamp(.9rem, 1.4vw, 1.05rem);
    color: #5f6775;
    max-width: 42rem;
    line-height: 1.55;
}

.benefits-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    width: min(100%, 72rem);
}

.benefit-card {
    background: #fff;
    border: 1.5px solid rgba(155, 184, 204, .55);
    border-radius: var(--radius-lg);
    padding: 1.8rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: .75rem;
    box-shadow: var(--shadow-card);
    transition: transform .35s cubic-bezier(.22, 1, .36, 1), box-shadow .35s ease, border-color .3s ease;
}

.benefit-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lift);
    border-color: #4ECDC4;
}

.benefit-icon {
    width: 3rem;
    height: 3rem;
    border-radius: .8rem;
    background: linear-gradient(135deg, #e3f2f4 0%, #9ee7df 100%);
    color: #1A535C;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.15rem;
}

.benefit-card h3 {
    font-size: 1.05rem;
    font-weight: 700;
    color: #123752;
    line-height: 1.2;
}

.benefit-card p {
    font-size: .9rem;
    color: #5f6775;
    line-height: 1.55;
}

/* ── HOW IT WORKS ────────────────────────────────────── */
.how-section {
    width: 100%;
    padding: 4.5rem 1.5rem 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    background: linear-gradient(180deg, #0f3d47 0%, #1A535C 100%);
}

.how-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .75rem;
    text-align: center;
}

.how-section .section-label {
    background: rgba(78, 205, 196, .18);
    color: #4ECDC4;
    border: 1px solid rgba(78, 205, 196, .3);
}

.how-header h2 {
    font-size: clamp(1.65rem, 3vw, 2.3rem);
    font-weight: 800;
    color: #fff;
    line-height: 1.1;
}

.how-subtitle {
    font-size: clamp(.9rem, 1.4vw, 1.05rem);
    color: #9ee7df;
    max-width: 42rem;
    line-height: 1.55;
}

.how-steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    width: min(100%, 72rem);
    position: relative;
}

.how-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: .85rem;
    position: relative;
    margin-bottom: 2rem;
}

.step-number {
    font-size: .72rem;
    font-weight: 800;
    letter-spacing: .12em;
    color: #4ECDC4;
}

.step-connector {
    position: absolute;
    top: 3.6rem;
    left: 50%;
    width: 100%;
    height: 1.5px;
    background: linear-gradient(90deg, rgba(78, 205, 196, .5) 0%, rgba(78, 205, 196, .15) 100%);
    z-index: 0;
}

.step-connector.last {
    display: none;
}

.step-icon {
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 1rem;
    background: rgba(78, 205, 196, .12);
    border: 1.5px solid rgba(78, 205, 196, .35);
    color: #4ECDC4;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    position: relative;
    z-index: 1;
    transition: background .3s ease, transform .3s ease;
}

.how-step:hover .step-icon {
    background: rgba(78, 205, 196, .22);
    transform: translateY(-3px);
}

.how-step h3 {
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
}

.how-step p {
    font-size: .88rem;
    color: #9ee7df;
    line-height: 1.6;
}

/* ── RESPONSIVE ──────────────────────────────────────── */

/* Tablet: 2 cols benefits, stacked feature */
@media (max-width: 900px) {
    .feature-section {
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 2.5rem 1.5rem;
    }

    .feature-section.reverse {
        direction: ltr;
    }

    .feature-image-wrap {
        min-height: 16rem;
        padding: 1.8rem;
    }

    .feature-img {
        max-width: 14rem;
    }

    .benefits-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .how-steps {
        grid-template-columns: repeat(2, 1fr);
    }

    .step-connector {
        display: none;
    }
}

/* Mobile: 1 col everything */
@media (max-width: 600px) {
    .home-container {
        padding-top: 3.8rem;
    }

    .banner-wrap {
        min-height: 22rem;
    }

    .banner-text {
        padding: 2rem 1.25rem;
        align-items: center;
        text-align: center;
    }

    .banner-eyebrow {
        font-size: .7rem;
    }

    .banner-title {
        font-size: clamp(1.55rem, 7vw, 2rem);
    }

    .banner-lead {
        font-size: .88rem;
        text-align: center;
    }

    .cta-btn {
        align-self: center;
        font-size: .88rem;
        padding: .7rem 1.5rem;
    }

    .marquee-wrap {
        padding: .9rem 0;
        mask-image: none;
        -webkit-mask-image: none;
    }

    .marquee-pill {
        font-size: .8rem;
        padding: .42rem .9rem;
    }

    .feature-section {
        padding: 2rem 1rem;
        gap: 1.5rem;
    }

    .feature-image-wrap {
        min-height: 13rem;
        padding: 1.5rem;
        border-radius: var(--radius-md);
    }

    .feature-img {
        max-width: 11rem;
    }

    .feature-text h2 {
        font-size: 1.35rem;
    }

    .feature-text p {
        font-size: .88rem;
    }

    .benefits-section {
        padding: 3rem 1rem 3.5rem;
        gap: 1.8rem;
    }

    .benefits-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .how-steps {
        grid-template-columns: 1fr;
        gap: 1.2rem;
    }

    .benefit-card {
        padding: 1.4rem 1.2rem;
        flex-direction: row;
        align-items: flex-start;
        gap: 1rem;
    }

    .benefit-icon {
        flex-shrink: 0;
        width: 2.6rem;
        height: 2.6rem;
        font-size: 1rem;
    }

    .benefit-card h3 {
        font-size: .97rem;
    }

    .benefit-card p {
        font-size: .84rem;
    }
}

@media (max-width: 380px) {
    .banner-title {
        font-size: 1.4rem;
    }

    .benefits-grid {
        gap: .8rem;
    }
}
</style>