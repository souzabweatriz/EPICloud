<template>
    <main class="dashboard-layout">
        <SideBar class="dashboard-sidebar" />
        <section class="dashboard-content">
            <RouterView />
        </section>
    </main>
</template>

<script setup>
import { RouterView } from 'vue-router'
import SideBar from '../../components/SideBar.vue'
</script>

<style scoped>
.dashboard-layout {
    width: 100%;
    min-height: 100vh;
    display: flex;
}

.dashboard-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 19rem;
    height: 100vh;
    z-index: 20;
    
}

.dashboard-content {
    width: 100%;
    min-height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    margin-left: 19rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

@media (max-width: 64rem) { /* ~1024px */
    .dashboard-sidebar {
        width: 14rem;
    }

    .dashboard-content {
        margin-left: 14rem;
        padding: 0.8rem;
    }
}

@media (max-width: 40rem) { /* ~640px */
    .dashboard-layout {
        min-height: 100vh;
    }

    .dashboard-sidebar {
        position: static;
        width: 100%;
        height: auto;
    }

    .dashboard-content {
        margin-left: 0;
        min-height: auto;
        overflow: visible;
        padding: 0.6rem;
    }
}
</style>
