<script setup>
import { useProducts } from '../composables/useProducts';
const { openModal, deleteProduct } = useProducts()

defineProps({
    product: {}
})
</script>

<template>
    <tr class="hover:bg-gray-50">
        <td class="px-4 py-2 text-sm text-gray-800 border-b border-gray-300">
            {{ product.name }}
        </td>
        <td class="px-4 py-2 text-sm text-gray-800 border-b border-gray-300">
            {{ product.category.name }}
        </td>
        <td class="px-4 py-2 text-sm text-gray-800 border-b border-gray-300">
            {{ product.barcode }}
        </td>
        <td class="px-4 py-2 text-sm text-gray-800 border-b border-gray-300">
            {{ product.presentation }}
        </td>
        <td class="px-4 py-2 text-sm text-gray-800 border-b border-gray-300">
            {{ product.description }}
        </td>
        <td class="px-4 py-2 text-sm text-gray-800 border-b border-gray-300">
            {{ product.reference }}
        </td>
        <td class="px-4 py-2 text-sm text-gray-800 border-b border-gray-300">
            {{ product.selling_price }}
        </td>
        <td class="px-4 py-2 text-sm text-gray-800 border-b border-gray-300">
            {{ product.product_cost }}
        </td>
        <td class="px-4 py-2 text-sm text-gray-800 border-b border-gray-300">
            <ul>
                <li v-for="(tax, key) in product.taxes" :key="key">
                    {{ tax.name }} - {{ tax.percentage }}%
                </li>
            </ul>
        </td>
        <td class="px-4 py-2 text-sm text-gray-800 border-b border-gray-300">
            <div class="flex items-center justify-center gap-2">
                <!-- Botón de Editar -->
                <button @click="openModal(product)"
                    class="p-1 rounded-full hover:bg-blue-100 text-blue-600 focus:outline-none" title="Editar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.862 4.487a2.25 2.25 0 011.91.77l.008.009a2.25 2.25 0 01.364 2.374l-5.865 10.64a4.25 4.25 0 01-6.58 1.25l-.004-.004-3.429-3.43a4.25 4.25 0 011.25-6.579l10.639-5.866a2.25 2.25 0 012.377.364l.008.008zM5.875 20.75H4.125A1.125 1.125 0 013 19.625V17.875m7.5-5.25L18 7.5" />
                    </svg>
                </button>

                <!-- Botón de Eliminar -->
                <button @click="deleteProduct(product._id)"
                    class="p-1 rounded-full hover:bg-red-100 text-red-600 focus:outline-none" title="Eliminar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </td>
    </tr>
</template>