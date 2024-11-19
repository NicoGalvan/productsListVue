<template>
    <div class="flex flex-col items-center sm:flex-row sm:justify-between lg:py-4 lg:gap-4">
        <div class="text-sm text-gray-600 text-center sm:text-left">
            Mostrando {{ info.totalReturnedProducts }} de {{ info.totalProducts }} productos
        </div>

        <div class="flex flex-wrap items-center gap-2 justify-center">
            <button :disabled="info.page === 1" @click="changePage(info.page - 1)"
                class="px-3 py-2 rounded-md border bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                Anterior
            </button>

            <button v-for="page in visiblePages" :key="page" @click="changePage(page)" :class="[
                'px-3 py-2 rounded-md border',
                page === info.page ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            ]">
                {{ page }}
            </button>

            <button :disabled="info.page === info.totalPages" @click="changePage(info.page + 1)"
                class="px-3 py-2 rounded-md border bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                Siguiente
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    info: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['update:page']);

const visiblePages = computed(() => {
    const { page, totalPages } = props.info;

    const range = 1; // Número de páginas visibles antes/después de la actual
    const start = Math.max(1, page - range);
    const end = Math.min(totalPages, page + range);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const changePage = (page) => {
    emit('update:page', page);
};
</script>