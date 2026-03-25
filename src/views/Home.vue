<template>
    <div>
        <AppHeader />
    </div>
    <div class="home-container">
        <nav class="home-nav">
            <h1 class="home-title">Proteção em cada detalhe, controle em cada entrega.</h1>
            <p class="text">Agende uma demonstração e veja como a EPICloud pode revolucionar a segurança na sua empresa</p>
            <button class="sobre-button" @click="router.push('/sobre')">Clique e conheça</button>
        </nav>
        <div class="colored-text">
            <p class="text-purple">Segurança elevada à nuvem</p>
            <p class="text-purple">Gestão que protege vidas</p>
            <p class="text-purple">Decisões mais inteligentes</p>
            <p class="text-purple">Controle em tempo real</p>
            <p class="text-purple">Eficiência que cresce</p>
            <p class="text-purple">Processos mais ágeis</p>
        </div>
        <div class="section-epis">
            <h1 class="title-epis">Controle total do ciclo de vida dos</h1>
            <h1 class="title-epis">equipamentos de proteção</h1>
        </div>
        <div
            ref="showcaseRef"
            class="epis-showcase"
            :style="{ '--scroll-progress': showcaseProgress }"
        >
            <img class="img-epi epi-botas" src="../../public/Image/botas.png" alt="Imagem de Botas EPI">
            <img class="img-epi epi-capacete" src="../../public/Image/capacete.png" alt="Imagem de capacete EPI">
            <img class="img-epi epi-fone" src="../../public/Image/fone.png" alt="Imagem de Fone EPI">
            <img class="img-armario" src="../../public/Image/Armario.png" alt="Armário que armazena as EPIs">
            <img class="img-epi epi-luvas" src="../../public/Image/luvas.png" alt="Imagem de Luvas EPI">
            <img class="img-epi epi-oculos" src="../../public/Image/oculos.png" alt="Imagem de Óculos EPI">
            <img class="img-epi epi-macacao" src="../../public/Image/macacao.png" alt="Imagem Macacão EPI">
        </div>
        <div
            ref="sectionTextRef"
            class="section-text"
            :class="{ 'is-visible': isSectionTextVisible }"
        >
            <h1 class="section-title">Pronto para transformar sua gestão de EPIs?</h1>
            <p class="section-subtitle">Aproveite de todas as funcionalidades que irão facilitar o seu dia</p>
        </div>
        <div class="section-gerenciamento">
            <h1 class="text-gerenciamento">Gerencie as EPI's do seu ambiente corporativo</h1>
            <aside class="aside-estoque">
                <div class="aside-bloco">
                    <h1 class="aside-epi">Botas</h1>
                    <p>2 unidades</p>
                    <p class="aside-quantidade">Estoque Crítico</p>
                </div>
                <div class="aside-bloco">
                    <h1 class="aside-epi">Luvas</h1>
                    <p>20 unidades</p>
                    <p class="aside-quantidadeemdia">Estoque em dia</p>
                </div>
                <div class="aside-bloco">
                    <h1 class="aside-epi">Fone</h1>
                    <p>20 unidades</p>
                    <p class="aside-quantidadeemdia"><span>Estoque em dia</span></p>
                </div>
                <div class="aside-bloco">
                    <h1 class="aside-epi">Óculos</h1>
                    <p>7 unidades</p>
                    <p class="aside-quantidade">Estoque Crítico</p>
                </div>
            </aside>
        </div>
        <div>
            <h1 class="section-title">Rastreamento do seu estoque de EPIs</h1>
        </div>
    </div>
    <AppFooter/>
</template>


<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '/components/Header/AppHeader.vue'
import AppFooter from '../../components/Footer/AppFooter.vue'

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

.home-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 23rem;
    width: 100%;
    background: radial-gradient(
    circle at center,
    #f0eef1 0%,
    #D4C1DB 50%,
    #3a004f99 100%
);

}
.home-title{
    max-width: 42rem;
    font-size: 2.7rem;
    color: #3A004F;
    font-weight: bolder;
}
.text{
    max-width: 34rem;
    font-size: 1.15rem;
    color: #2a0837bb;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.sobre-button{
    margin-top: 1.4rem;
    width: 10.2rem;
    height: 3.3rem;
    border-radius: 0.85rem;
    background: linear-gradient(90deg, #3c0643 0%, 40%, #b8a0c3 100%);
    background-size: 200% 200%;
    background-position: 0% 50%;
    border: none;
    color: black;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.341);
    cursor: pointer;
    transition: transform 0.5s ease;
    font-weight: bolder;
    color: white;
    font-size: 0.92rem;
}
.sobre-button:hover {
    background-position: 100% 50%;
    transform: scale(1.05);
    background: linear-gradient(90deg, #3c0643 0%, 40%, #b8a0c3 100%);
    background-size: 200% 200%;
    background-position: 0% 50%;
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
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
}
.text-purple{
    background-color: #ffffffb0;
    border-radius: 1.2rem;
    padding: 0.7rem 0.9rem;
    border:  1px solid #3A004F;
    color: #3A004F;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.88rem;
    opacity: 0;
    transform: translateY(12px);
    animation: revealText 0.6s ease forwards;
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

.text-purple:nth-child(1) {
    animation-delay: 0.15s;
}

.text-purple:nth-child(2) {
    animation-delay: 0.35s;
}

.text-purple:nth-child(3) {
    animation-delay: 0.55s;
}

.text-purple:nth-child(4) {
    animation-delay: 0.75s;
}

@keyframes revealText {
    from {
        opacity: 0;
        transform: translateY(12px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
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
.section-gerenciamento{
    margin-bottom: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: min(100%, 1020px);
    min-height: 20rem;
    margin-top: 1.8rem;
    padding: 1.8rem 1.7rem;
    border-radius: 1.4rem;
    background:
        radial-gradient(circle at 85% 20%, rgba(144, 112, 160, 0.2), transparent 45%),
        linear-gradient(130deg, #f7f3fa 0%, #efe6f4 52%, #eadff1 100%);
    box-shadow: 0 16px 40px rgba(58, 0, 79, 0.14);
}
.text-gerenciamento{
    color:#4A1D5C;
    max-width: 21rem;
    font-size: 1.8rem;
    line-height: 1.12;
    letter-spacing: -0.01em;
}

.aside-estoque {
    width: min(100%, 35rem);
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
}
.aside-bloco{
    display: flex;
    text-align: left;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.7rem;
    width: 100%;
    min-height: 3.3rem;
    padding: 0.7rem 0.9rem;
    background-color: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(90, 40, 108, 0.15);
    border-radius: 1.1rem;
    box-shadow:
        0 10px 18px rgba(69, 43, 84, 0.12);
    transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
}

.aside-bloco:hover {
    transform: translateY(-4px);
    border-color: rgba(90, 40, 108, 0.35);
    box-shadow:
        0 16px 26px rgba(69, 43, 84, 0.2);
}

.aside-bloco p {
    margin: 0;
    color: #4c3a5a;
    font-weight: 500;
    font-size: 0.92rem;
}
.aside-quantidade{
    display: flex;
    align-items: center;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    min-width: 8.1rem;
    height: 1.7rem;
    background-color: #f8d8cf;
    color: #730A0A;
    border-radius: 999px;
    border: 1px solid rgba(191, 25, 10, 0.2);
    transition: background-color 0.25s ease, transform 0.25s ease;
}
.aside-quantidadeemdia{
    display: flex;
    align-items: center;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    min-width: 8.1rem;
    height: 1.7rem;
    background-color: #d8eadb;
    color: #10403B;
    border-radius: 999px;
    border: 1px solid rgba(16, 64, 59, 0.16);
    transition: background-color 0.25s ease, transform 0.25s ease;
}
.aside-epi{
    margin: 0;
    font-size: 0.9rem;
    min-width: 4.6rem;
    color: #2f183d;
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

.aside-bloco:hover .aside-quantidade,
.aside-bloco:hover .aside-quantidadeemdia {
    transform: scale(1.03);
}

@media (max-width: 1024px) {
    .section-gerenciamento {
        flex-direction: column;
        align-items: flex-start;
        gap: 1.1rem;
        padding: 1.3rem 1.1rem;
        border-radius: 1.1rem;
    }

    .text-gerenciamento {
        max-width: 100%;
        font-size: 1.45rem;
    }

    .aside-estoque {
        width: 100%;
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
        gap: 0.7rem;
        padding: 0 0.7rem;
    }

    .section-gerenciamento {
        width: calc(100% - 1.2rem);
        margin-top: 1.2rem;
    }

    .aside-bloco {
        flex-wrap: wrap;
        justify-content: flex-start;
        row-gap: 0.5rem;
    }
}
</style>
