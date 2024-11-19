<script setup>
import Card from './Card.vue';
import CardHeader from './CardHeader.vue';
import CardBody from './CardBody.vue';
import ModalComponent from './ModalComponent.vue';
import ProductForm from './ProductForm.vue';
import { useProducts } from '../composables/useProducts';
import { onMounted } from 'vue';
const { getCategories, getTaxes, getProducts, modal, selectedProduct, closeModal } = useProducts()

onMounted(() => {
  getProducts()
  getCategories()
  getTaxes()
})
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <Card class="w-10/12">
      <template #header>
        <CardHeader />
      </template>
      <CardBody />
    </Card>
    <ModalComponent :isOpen="modal" @close="closeModal">
      <ProductForm :product="selectedProduct" />
    </ModalComponent>
  </div>
</template>