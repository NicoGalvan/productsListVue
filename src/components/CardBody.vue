<script setup>
import ProductsTable from './ProductsTable.vue';
import Pagination from './Pagination.vue';
import TrComponent from './TrComponent.vue';
import { useProducts } from '../composables/useProducts';
const { pagination, paginateProducts, filteredProducts } = useProducts()

const columns = [
  "Nombre", "Categoria", "Codigo de barras", "Presentación", "Descripción",
  "Referencia", "Precio de venta", "Costo", "Impuestos", "Acciones"
];
</script>
<template>
  <ProductsTable :columns="columns">
    <template v-if="filteredProducts.length === 0">
      <tr>
        <td :colspan="columns.length" class="px-4 py-2 text-center text-sm text-gray-500">
          No se encontraron registros.
        </td>
      </tr>
    </template>
    <template v-else>
      <TrComponent v-for="(product, index) in filteredProducts" :key="index" :product="product" />
    </template>
  </ProductsTable>
  <Pagination :info="pagination" @update:page="paginateProducts" />
</template>