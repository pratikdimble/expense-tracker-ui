<script setup>
import EmsFooter from './EmsFooter.vue';
import EmsHeader from './EmsHeader.vue';

</script>
<template>
    <EmsHeader />
    <main class="container">
        <RouterView v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </RouterView>
    </main>
    <!-- <EmsFooter /> -->
</template>
<style scoped></style>
