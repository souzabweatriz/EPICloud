<template>
    <div>
        <AppHeader />
    </div>
    <div class="home-container">
        <nav class="home-nav">
            <h1 class="home-title">Proteção em cada detalhe, controle em cada entrega.</h1>
            <img class="nav-image" src="/Image/Capacete.png" alt="Capacete roxo e laranja" />
        </nav>
        <div class="colored-text">
            <p class="text-orange">Segurança elevada à nuvem</p>
            <p class="text-purple">Gestão que protege vidas</p>
            <p class="text-orange">Gestão que protege vidas</p>
            <p class="text-purple">Gestão que protege vidas</p>
        </div>
        <div class="section-epis">
            <h1 class="title-epis">Controle total do ciclo de vida dos</h1>
            <h1 class="title-epis">equipamentos de proteção</h1>
            <img class="img-armario" src="../../public/Image/Armario.png" alt="">
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
                    <h1 class="aside-epi">Macacão</h1>
                    <p>7 unidades</p>
                    <p class="aside-quantidade">Estoque Crítico</p>
                </div>
            </aside>
        </div>
        <div class="home-title">Pronto para transformar</div>

    </div>
</template>


<script setup>
import AppHeader from '/components/Header/AppHeader.vue'
</script>

<style scoped>
.home-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
}

.home-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 30rem;
    width: 100%;
    background: radial-gradient(
    circle at center,
    #f0eef1 0%,
    #e6ddea8c 45%,
    #c4b1ce85 100%
);

}
.home-title{
    max-width: 25rem;
    font-size: 3.4rem;
    background: linear-gradient(190deg, #3A004F 0%, #3A004F 20%, #F25D27 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.nav-image{
    display: flex;
    width: 30rem;
    height: 20rem;
}
.colored-text{
    display: flex;
    margin-top: 2rem;
    justify-content: center;
    align-items: center;
    gap: 4rem;
}
.text-orange{
    background-color: #fdac8fa2;
    border-radius: 2rem;
    padding: 1rem;
    border:  1px solid #F25D27;
    color: #F25D27;
}
.text-purple{
    background-color: #D4C1DB;
    border-radius: 2rem;
    padding: 1rem;
    border:  1px solid #3A004F;
    color: #3A004F;
}
.section-epis{
    margin-top: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.title-epis{
    display: flex;
    align-items: center;
}
.img-armario{
    height: 45rem;
}
.section-gerenciamento{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 80rem;
    background-color: #F5F3F6;
    height: 20rem;
}
.text-gerenciamento{
    color:#5A286C;
    width: 10rem;
    font-size: 2.5rem;
}
.aside-bloco{
    margin-left: 10rem;
    margin-top: 1rem;
    display: flex;
    text-align: center;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 27rem;
    height: 4rem;
    background-color: white;
    border-radius: 2rem;
    box-shadow:
        5px 5px 10px #979494,
        -5px -5px 10px #ffffff;
}
.aside-quantidade{
    display: flex;
    align-items: center;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    width: 10rem;
    height: 2rem;
    color: #F25D27;
    background-color: #bf190a42;
    color: #730A0A;
    border-radius: 2rem;
    box-shadow:
        5px 5px 10px #d9d9d9,
        -5px -5px 10px #ffffff;
}
.aside-quantidadeemdia{
    display: flex;
    align-items: center;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    width: 10rem;
    height: 2rem;
    background-color: #CCDECD;
    color: #10403B;
    border-radius: 2rem;
    box-shadow:
        5px 5px 10px #d9d9d9,
        -5px -5px 10px #ffffff;
}
.aside-epi{
    font-size: 1.5rem;
}
</style>

<script>
export default {
    name: 'Home'
}
</script>