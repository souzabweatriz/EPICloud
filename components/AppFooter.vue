<template>
    <footer class="app-footer">
        <div class="footer-shell">
            <div class="footer-top">
                <section class="brand-column">
                    <div class="brand-row">
                        <img src="/Image/epicloud.png" alt="Logo do EPICloud" class="brand-icon" />
                        <p class="brand-title">EPICloud</p>
                    </div>

                    <p class="brand-copy">
                        Infraestrutura de alto nivel para aplicacoes criticas.
                        Onde a performance encontra a confiabilidade.
                    </p>

                    <form class="email-form" @submit.prevent="sendEmail">
                        <label for="footer-email" class="sr-only">Digite seu e-mail</label>
                        <div class="email-input-wrapper">
                            <span class="email-icon" aria-hidden="true">✉</span>
                            <input
                                id="footer-email"
                                v-model="email"
                                type="email"
                                class="email-input"
                                placeholder="mail@epicloud.com.br"
                                required
                            />
                        </div>
                        <button type="submit" class="sr-only">Enviar</button>
                    </form>
                </section>

                <section class="links-column">
                    <div class="links-group">
                        <h4 class="group-title">PRODUTO</h4>
                        <a href="#" class="footer-link">EPI Cloud</a>
                        <a href="#" class="footer-link">Recursos</a>
                        <a href="#" class="footer-link">Tecnologias</a>
                    </div>

                    <div class="links-group">
                        <h4 class="group-title">EMPRESA</h4>
                        <a href="#" class="footer-link">Equipe</a>
                        <a href="#" class="footer-link">Contato</a>
                    </div>

                    <div class="links-group">
                        <h4 class="group-title">SUPORTE</h4>
                        <a href="mailto:contato@epicloud.com.br" class="footer-link">contato@epicloud.com.br</a>
                    </div>
                </section>
            </div>

            <div class="footer-bottom">
                <p>EPICloud © 2026. O futuro e agora.</p>
                <p>Construido com precisao. Escalado com proposito.</p>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const sendEmail = () => {
    const targetEmail = 'contato@epicloud.com.br'
    const subject = encodeURIComponent('Contato via site EPICloud')
    const body = encodeURIComponent(`Meu e-mail para retorno: ${email.value}`)

    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`
}
</script>

<style scoped>
.app-footer {
    width: 100%;
    padding: 2.3rem 1.4rem 1.2rem;
    color: #d6d2e1;
    background:
        radial-gradient(circle at 20% -10%, rgba(80, 74, 141, 0.3), transparent 45%),
        radial-gradient(circle at 85% 15%, rgba(31, 72, 131, 0.18), transparent 42%),
        linear-gradient(180deg, #080713 0%, #05040f 100%);
}

.footer-shell {
    width: min(100%, 1080px);
    margin: 0 auto;
}

.footer-top {
    display: grid;
    grid-template-columns: minmax(260px, 360px) 1fr;
    gap: 2.5rem;
}

.brand-column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
}

.brand-row {
    display: flex;
    align-items: center;
    gap: 0.7rem;
}

.brand-icon {
    width: 1.55rem;
    height: 1.55rem;
    object-fit: contain;
    opacity: 0.92;
}

.brand-title {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: #f2f0fb;
}

.brand-copy {
    margin: 0;
    color: #8f8ba0;
    font-size: 0.84rem;
    line-height: 1.45;
    max-width: 26rem;
}

.email-form {
    width: 100%;
}

.email-input-wrapper {
    width: min(100%, 260px);
    display: flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.62rem 0.78rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.8rem;
    background: rgba(14, 11, 26, 0.9);
    box-shadow:
        inset 0 0 20px rgba(65, 69, 124, 0.1),
        0 14px 26px rgba(0, 0, 0, 0.3);
}

.email-icon {
    color: #7a7494;
    font-size: 0.82rem;
    line-height: 1;
}

.email-input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: #ebe7f8;
    font-size: 0.84rem;
}

.email-input::placeholder {
    color: #7a7494;
}

.links-column {
    display: grid;
    grid-template-columns: repeat(3, minmax(120px, 1fr));
    gap: 1.1rem;
    align-content: start;
    padding-top: 2.8rem;
}

.links-group {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
}

.group-title {
    margin: 0;
    color: #c7c3d7;
    letter-spacing: 0.06em;
    font-size: 0.86rem;
    font-weight: 700;
}

.footer-link {
    color: #838092;
    text-decoration: none;
    font-size: 0.84rem;
    transition: color 0.25s ease;
}

.footer-link:hover {
    color: #e6e3f3;
}

.footer-bottom {
    margin-top: 2.2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 0.95rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    color: #5f5b73;
    font-size: 0.72rem;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
}

@media (max-width: 640px) {
    .app-footer {
        padding: 1.8rem 0.95rem 1.1rem;
    }

    .footer-top {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .brand-column {
        align-items: center;
        text-align: center;
    }

    .brand-row {
        justify-content: center;
    }

    .brand-title {
        font-size: 1.08rem;
    }

    .brand-copy {
        font-size: 0.8rem;
    }

    .email-input-wrapper {
        width: min(100%, 240px);
        margin: 0 auto;
    }

    .links-column {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        padding-top: 0;
        gap: 0.8rem;
        text-align: center;
    }

    .group-title {
        font-size: 0.88rem;
    }

    .footer-link {
        font-size: 0.84rem;
    }

    .footer-bottom {
        flex-direction: column;
        gap: 0.35rem;
        font-size: 0.69rem;
    }
}

@media (max-width: 420px) {
    .app-footer {
        padding: 1.55rem 0.75rem 1rem;
    }

    .brand-copy {
        font-size: 0.76rem;
        line-height: 1.35;
    }

    .email-input-wrapper {
        width: min(100%, 220px);
        padding: 0.55rem 0.7rem;
    }

    .group-title {
        font-size: 0.82rem;
    }

    .footer-link {
        font-size: 0.8rem;
    }

    .footer-bottom {
        font-size: 0.65rem;
    }
}

@media (min-width: 641px) and (max-width: 1024px) {
    .footer-top {
        grid-template-columns: 1fr;
        gap: 1.8rem;
    }

    .links-column {
        padding-top: 0;
        grid-template-columns: repeat(3, minmax(100px, 1fr));
    }
}
</style>
