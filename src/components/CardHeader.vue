<template>
    <div class="p-4 rounded-t-lg flex items-center gap-2 lg:gap-10 flex-wrap">
        <h1 class="lg:text-3xl font-semibold whitespace-nowrap hidden lg:block text-gray-500">Productos</h1>
        <input v-model="searchTerm" type="text" placeholder="Filtrar productos por nombre o categoría"
            class="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 w-1/2" />
        <button
        @click="openModal()"
            class="flex items-center gap-2 px-4 py-2 bg-primary text-white font-semibold rounded-full hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd" />
            </svg>
            Agregar
        </button>
    </div>
</template>

<script setup>
import { useProducts } from '../composables/useProducts';
const { searchTerm, openModal } = useProducts()
</script>