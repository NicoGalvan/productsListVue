<script setup>
import { useProducts } from '../composables/useProducts';
const { isLoading } = useProducts()
</script>

<template>
    <div v-if="isLoading" class="loading-screen bg-white">
        <div class="loading-content">
            <!-- SVG de carga -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="rotate-animation" width="100" height="100">
                <circle cx="50" cy="50" r="40" stroke="gray" stroke-width="4" fill="none"/>
                <circle cx="50" cy="50" r="40" stroke="#16A8E1" stroke-width="4" fill="none" stroke-dasharray="251.2" stroke-dashoffset="0" class="circle"></circle>
            </svg>
        </div>
    </div>
</template>

<style scoped>
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.loading-content svg {
    width: 100px;
    height: 100px;
}

.rotate-animation {
    animation: rotate 1s linear infinite;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.circle {
    animation: dash 1.5s ease-in-out infinite;
}

@keyframes dash {
    0% {
        stroke-dashoffset: 251.2;
    }
    50% {
        stroke-dashoffset: 62.8;
    }
    100% {
        stroke-dashoffset: 251.2;
    }
}
</style>
