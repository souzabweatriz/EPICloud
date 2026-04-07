<template>
    <div>
        <AppHeader />
    </div>
    <div class="home-container">
        <div class="banner-wrap">
            <img class="banner" src="../../public/Image/bannerWebsite.png" alt="Banner do Website">
            <div class="banner-text">
                <p class="banner-eyebrow">A inteligência que o seu estoque de EPIs precisava.</p>
                <h2>Gestão em nuvem, segurança em tempo real</h2>
            </div>
        </div>
        <div class="colored-text">
            <div class="carousel-track">
                <p class="carousel-text">Segurança elevada à nuvem</p>
                <p class="carousel-text">Gestão que protege vidas</p>
                <p class="carousel-text">Decisões mais inteligentes</p>
                <p class="carousel-text">Controle em tempo real</p>
                <p class="carousel-text">Eficiência que cresce</p>
                <p class="carousel-text">Processos mais ágeis</p>
            </div>
            <div class="carousel-track" aria-hidden="true">
                <p class="carousel-text">Segurança elevada à nuvem</p>
                <p class="carousel-text">Gestão que protege vidas</p>
                <p class="carousel-text">Decisões mais inteligentes</p>
                <p class="carousel-text">Controle em tempo real</p>
                <p class="carousel-text">Eficiência que cresce</p>
                <p class="carousel-text">Processos mais ágeis</p>
            </div>
        </div>
        <div class="section-epis">
            <h1 class="title-epis">Controle total do ciclo de vida dos</h1>
            <h1 class="title-epis">equipamentos de proteção</h1>
        </div>
            <h1 class="section-title">Pronto para transformar sua gestão de EPIs?</h1>
            <p class="section-subtitle">Aproveite de todas as funcionalidades que irão facilitar o seu dia</p>
        </div>
    <AppFooter/>
</template>


<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '/components/AppHeader.vue'
import AppFooter from '../../components/AppFooter.vue'

const router = useRouter()
const showcaseRef = ref(null)
const showcaseProgress = ref(0)
const sectionTextRef = ref(null)
const isSectionTextVisible = ref(false)
let sectionTextObserver = null

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const updateShowcaseProgress = () => {
    if (!showcaseRef.value) {
        return
    }

    const rect = showcaseRef.value.getBoundingClientRect()
    const sectionCenter = rect.top + rect.height / 2
    const viewportCenter = window.innerHeight / 2
    const startDistance = window.innerHeight * 0.55
    const distanceToCenter = sectionCenter - viewportCenter
    const progress = 1 - distanceToCenter / startDistance

    showcaseProgress.value = clamp(progress, 0, 1)
}

onMounted(() => {
    updateShowcaseProgress()
    window.addEventListener('scroll', updateShowcaseProgress, { passive: true })
    window.addEventListener('resize', updateShowcaseProgress)

    sectionTextObserver = new IntersectionObserver(
        (entries) => {
            const [entry] = entries

            if (!entry.isIntersecting) {
                return
            }

            isSectionTextVisible.value = true
            sectionTextObserver.disconnect()
        },
        {
            threshold: 0.35,
        }
    )

    if (sectionTextRef.value) {
        sectionTextObserver.observe(sectionTextRef.value)
    }
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateShowcaseProgress)
    window.removeEventListener('resize', updateShowcaseProgress)

    if (sectionTextObserver) {
        sectionTextObserver.disconnect()
    }
})
</script>

<style scoped>
.home-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    background-color: #ffffff;
}

.banner-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    min-height: 19rem;
    overflow: hidden;
}

.banner-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(26, 34, 44, 0.716);
    pointer-events: none;
    z-index: 1;
}

.banner{
    width: 100%;
    min-height: 19rem;
    max-height: 35rem;
    object-fit: cover;
    display: block;
}

.banner-text {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 1.2rem;
    text-align: center;
    z-index: 2;
    color: #f4f7f6;
    text-shadow: 0 4px 16px rgba(0, 0, 0, 0.45);
}

.banner-eyebrow {
    font-size: 1rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 0.35rem;
    color: #9dd7d3;
}

.banner-text h2 {
    font-size: clamp(1.35rem, 2.6vw, 2.4rem);
    line-height: 1.1;
    max-width: 22ch;
}

.sobre-button{
    margin-top: 1.4rem;
    width: 10rem;
    height: 3rem;
    border-radius: 0.85rem;
    background: linear-gradient(135deg, #1A535C 0%, #0f3d47 100%);
    border: none;
    color: #f4f7f6;
    box-shadow: 0px 4px 12px rgba(26, 53, 92, 0.22);
    cursor: pointer;
    transition: background 0.3s ease, box-shadow 0.3s ease;
    font-weight: 700;
    font-size: 0.92rem;
}
.sobre-button:hover {
    background: linear-gradient(135deg, #084f4a 0%, #3db5ac 100%);
    box-shadow: 0px 6px 16px rgba(78, 205, 196, 0.28);
}
.epis-showcase{
    position: relative;
    width: min(100%, 62rem);
    height: 40rem;
    margin-top: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.colored-text{
    display: flex;
    margin-top: 1.4rem;
    align-items: center;
    gap: 1rem;
    overflow: hidden;
    width: 100%;
    padding: 0 0.6rem;
    mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
}

.carousel-track {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: max-content;
    animation: marquee 26s linear infinite;
}

.carousel-text {
    background-color: #ffffffb0;
    border-radius: 1.2rem;
    padding: 0.7rem 0.9rem;
    border:  1px solid #062a38;
    color: #00454f;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.88rem;
    white-space: nowrap;
    flex-shrink: 0;
}

.section-text{
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    gap: 0.7rem;
    margin-top: 1.5rem;
    padding: 0.8rem 1.2rem;
    isolation: isolate;
}

.section-text::before {
    content: "";
    position: absolute;
    inset: -10% 12%;
    border-radius: 2rem;
    background: radial-gradient(circle at 50% 50%, rgba(133, 51, 195, 0.14) 0%, rgba(133, 51, 195, 0) 70%);
    filter: blur(10px);
    opacity: 0;
    z-index: -1;
}

.section-text.is-visible::before {
    animation: sectionGlow 1.2s ease-out forwards;
}

@keyframes marquee {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(calc(-100% - 1rem));
    }
}
.section-epis{
    margin-top: 2.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.img-armario{
    height: 36rem;
    z-index: 2;
}

.img-epi {
    position: absolute;
    width: 6.7rem;
    z-index: 3;
    filter: drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.18));
    --item-delay: 0;
    --item-duration: 0.18;
    --item-progress: clamp(0, calc((var(--scroll-progress) - var(--item-delay)) / var(--item-duration)), 1);
    opacity: var(--item-progress);
    transform: translate(
        calc((1 - var(--item-progress)) * var(--from-x, 0rem)),
        calc((1 - var(--item-progress)) * var(--from-y, 0rem))
    ) scale(calc(0.45 + var(--item-progress) * 0.55));
    will-change: transform, opacity;
}

.epi-botas {
    top: 2.6rem;
    left: 2.2rem;
    --from-x: 13rem;
    --from-y: 8rem;
    --item-delay: 0.02;
}

.epi-capacete {
    top: 15rem;
    left: 8.6rem;
    --from-x: 17rem;
    --from-y: -1rem;
    --item-delay: 0.16;
}

.epi-fone {
    bottom: 6rem;
    left: 2.2rem;
    --from-x: 15rem;
    --from-y: -7rem;
    --item-delay: 0.3;
}

.epi-luvas {
    top: 2.6rem;
    right: 2.2rem;
    --from-x: -13rem;
    --from-y: 8rem;
    --item-delay: 0.44;
}

.epi-oculos {
    top: 15rem;
    right: 8.7rem;
    --from-x: -15rem;
    --from-y: -1rem;
    --item-delay: 0.58;
}

.epi-macacao {
    bottom: 1.2rem;
    right: 2.2rem;
    width: 7.4rem;
    --from-x: -14rem;
    --from-y: -8rem;
    --item-delay: 0.72;
}

.section-title{
    max-width: 42rem;
    font-size: 2.25rem;
    color: #3A004F;
    background: linear-gradient(135deg, #2f003f 0%, #5a1b73 55%, #8533c3 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bolder;
    opacity: 0;
    transform: translateY(16px) scale(0.98);
}
.title-epis{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #3A004F;
    font-size: 1.95rem;
}

.section-text.is-visible .section-title {
    animation: titleReveal 0.7s ease-out forwards, gradientFlow 6s ease-in-out infinite;
}

@media (max-width: 900px) {
    .epis-showcase {
        height: 31rem;
    }

    .img-armario {
        height: 28rem;
    }

    .img-epi {
        width: 4.8rem;
    }

    .epi-botas {
        left: 1.2rem;
    }

    .epi-capacete {
        left: 1.6rem;
        top: 11rem;
    }

    .epi-fone {
        left: 0.7rem;
        bottom: 4rem;
    }

    .epi-luvas {
        right: 1.2rem;
    }

    .epi-oculos {
        right: 1.8rem;
        top: 11rem;
    }

    .epi-macacao {
        right: 0.8rem;
        bottom: 4rem;
        width: 5.6rem;
    }
}
.section-tracking {
    margin-top: 1.4rem;
    margin-bottom: 2.2rem;
    padding: 0 1rem;
    text-align: center;
}

.section-subtitle{
    font-size: 1.02rem;
    color: #210533;
    margin: 0;
    opacity: 0;
    transform: translateY(10px);
}

.section-text.is-visible .section-subtitle {
    animation: subtitleReveal 0.7s ease-out forwards;
    animation-delay: 0.2s;
}

@keyframes sectionGlow {
    to {
        opacity: 1;
    }
}

@keyframes titleReveal {
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

@keyframes subtitleReveal {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes gradientFlow {
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

@media (max-width: 1024px) {
    .home-nav {
        height: 21rem;
        padding: 1rem;
    }

    .home-title {
        font-size: 2.2rem;
        max-width: 32rem;
    }

    .text {
        font-size: 1.02rem;
        max-width: 30rem;
    }

    .banner-text h2 {
        max-width: 18ch;
    }

    .carousel-text {
        font-size: 0.82rem;
    }

    .carousel-track {
        animation-duration: 30s;
    }
}

@media (max-width: 768px) {
    .banner-wrap,
    .banner {
        min-height: 16.5rem;
    }

    .banner-text {
        padding: 1rem;
    }

    .banner-eyebrow {
        font-size: 0.78rem;
        letter-spacing: 0.06em;
    }

    .banner-text h2 {
        font-size: clamp(1.12rem, 5vw, 1.7rem);
        max-width: 16ch;
    }

    .sobre-button {
        width: 8.8rem;
        height: 2.6rem;
        font-size: 0.82rem;
        margin-top: 0.9rem;
    }

    .colored-text {
        margin-top: 1rem;
        gap: 0.7rem;
        padding: 0 0.4rem;
    }

    .carousel-text {
        font-size: 0.76rem;
        padding: 0.52rem 0.68rem;
    }

    .carousel-track {
        gap: 0.7rem;
        animation-duration: 26s;
    }

    .epis-showcase {
        height: 24rem;
        margin-top: 0;
    }

    .img-armario {
        height: 18.5rem;
    }

    .img-epi {
        width: 3.5rem;
    }

    .epi-botas {
        left: 0.4rem;
        top: 2.8rem;
    }

    .epi-capacete {
        left: 0.6rem;
        top: 8.9rem;
    }

    .epi-fone {
        left: 0.2rem;
        bottom: 4.1rem;
    }

    .epi-luvas {
        right: 0.5rem;
        top: 2.8rem;
    }

    .epi-oculos {
        right: 0.8rem;
        top: 8.8rem;
    }

    .epi-macacao {
        right: 0.3rem;
        bottom: 3.8rem;
        width: 3.9rem;
    }

    .title-epis {
        font-size: 1.3rem;
        line-height: 1.2;
        padding: 0 0.9rem;
    }
}

@media (max-width: 640px) {
    .home-nav {
        height: 19rem;
        padding: 1rem;
    }

    .home-title {
        font-size: 1.8rem;
        text-align: center;
    }

    .text {
        font-size: 0.97rem;
    }

    .title-epis {
        font-size: 1.4rem;
        text-align: center;
    }

    .section-title {
        font-size: 1.6rem;
        text-align: center;
    }

    .colored-text {
        gap: 0.55rem;
        padding: 0 0.7rem;
    }

    .carousel-track {
        animation-duration: 24s;
    }

    .section-tracking {
        margin-top: 1rem;
        margin-bottom: 1.8rem;
    }
}

@media (max-width: 480px) {
    .banner-wrap,
    .banner {
        min-height: 14rem;
    }

    .banner-text {
        gap: 0.35rem;
        padding: 0.8rem;
    }

    .banner-text h2 {
        font-size: clamp(1rem, 6vw, 1.35rem);
        max-width: 15ch;
    }

    .home-nav {
        height: 17rem;
    }

    .home-title {
        font-size: 1.5rem;
    }

    .text {
        font-size: 0.9rem;
        max-width: 20rem;
    }

    .sobre-button {
        width: 8.2rem;
        height: 2.4rem;
        font-size: 0.78rem;
    }

    .section-title {
        font-size: 1.35rem;
    }

    .section-subtitle {
        font-size: 0.92rem;
        padding: 0 0.5rem;
    }

    .colored-text {
        margin-top: 0.85rem;
        padding: 0 0.5rem;
        mask-image: none;
    }

    .carousel-track {
        animation-duration: 22s;
    }

    .carousel-text {
        font-size: 0.72rem;
        padding: 0.45rem 0.62rem;
    }
}
</style>
