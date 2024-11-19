import { defineStore } from "pinia";
import Swal from 'sweetalert2'
import { ref } from "vue";
import { getCategories, getProducts, getTaxes, putProduct, postProduct, deleteProduct } from "../services/productService";

export const useProductStore = defineStore("productStore", () => {
  const categories = ref([]);
  const products = ref([]);
  const pagination = ref({});
  const limit = 10;
  const page = ref(1);
  const isLoading = ref(false);
  const error = ref(null);
  const searchTerm = ref("");
  const modal = ref(false);
  const selectedProduct = ref({});
  const taxes = ref([])

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      categories.value = response.data.categories;
    } catch (err) {
      error.value = err.message;
      console.error("Error loading categories:", err);
    }
  };

  const loadTaxes = async () => {
    try {
      const response = await getTaxes();
      taxes.value = response.data.body;
    } catch (err) {
      error.value = err.message;
      console.error("Error loading taxes:", err);
    }
  };

  const loadProducts = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await getProducts(page.value, limit);
      pagination.value = response.data.data.meta;
      products.value = response.data.data.products;
    } catch (err) {
      error.value = err.message;
      console.error("Error loading products:", err);
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Ocurrió un error en el servidor al cargar los productos, por favor inténtelo nuevamente",
      });
    } finally {
      isLoading.value = false;
    }
  };

  const setPage = (pag) => {
    page.value = pag;
  };

  const closeModal = () => {
    modal.value = false
    selectedProduct.value = {}
  }

  const openModal = (product) => {
    modal.value = true
    selectedProduct.value = product
  }

  const editProduct = async (product, id) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await putProduct(product, id);
      Swal.fire({
        title: "Producto actualizado",
        text: response.data.message,
        icon: "success"
      });
    } catch (err) {
      error.value = err.message;
      console.error("Error updating product:", err);
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Ocurrió un error inesperado, inténtelo nuevamente!",
      });
    } finally {
      isLoading.value = false;
    }
  };

  const createProduct = async (product) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await postProduct(product);
      Swal.fire({
        title: "Producto guardado",
        text: response.data.message,
        icon: "success"
      });
    } catch (err) {
      error.value = err.message;
      console.error("Error updating product:", err);
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Ocurrió un error inesperado, inténtelo nuevamente!",
      });
    } finally {
      isLoading.value = false;
    }
  };

  const removeProduct = async (id) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await deleteProduct(id);
      Swal.fire({
        title: "Producto eliminado",
        text: response.data.message,
        icon: "success"
      });
    } catch (err) {
      error.value = err.message;
      console.error("Error updating product:", err);
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Ocurrió un error inesperado, inténtelo nuevamente!",
      });
    } finally {
      isLoading.value = false;
    }
  };

  return {
    //data
    categories,
    products,
    pagination,
    limit,
    page,
    isLoading,
    error,
    searchTerm,
    modal,
    selectedProduct,
    taxes,
    isLoading,

    //methods
    loadProducts,
    loadCategories,
    setPage,
    closeModal,
    openModal,
    loadTaxes,
    editProduct,
    createProduct,
    removeProduct,
  };
});
