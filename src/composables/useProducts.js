import { storeToRefs } from "pinia";
import Swal from 'sweetalert2'
import { useProductStore } from "../stores/productStore";
import { computed } from "vue";

export const useProducts = () => {
  const productStore = useProductStore();
  const {
    categories,
    products,
    pagination,
    searchTerm,
    modal,
    selectedProduct,
    taxes,
    isLoading,
    page,
  } = storeToRefs(productStore);

  const getCategories = async () => {
    if (categories.value.length > 0) return;
    productStore.loadCategories();
  };

  const getTaxes = async () => {
    if (taxes.value.length > 0) return;
    productStore.loadTaxes();
  };

  const getProducts = async () => {
    productStore.loadProducts();
  };

  const openModal = (product) => {
    productStore.openModal(product);
  };

  const closeModal = () => {
    productStore.closeModal();
  };

  const paginateProducts = async (page) => {
    await productStore.setPage(page);
    productStore.loadProducts();
  };

  const saveEditedProduct = async (product, id) => {
    await productStore.editProduct(product, id);
    productStore.closeModal()
    productStore.loadProducts();
  };

  const saveNewProduct = async (product) => {
    await productStore.createProduct(product);
    productStore.closeModal()
    productStore.loadProducts();
  };

  const deleteProduct = async (id) => {
    Swal.fire({
        title: "¿Está seguro de eliminar el producto?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
      }).then( async (result) => {
        if (result.isConfirmed) {
          await productStore.removeProduct(id);
          const newPage =page.value -1
          if (products.value.length === 1 && pagination.value.totalPages > 1) {
            await productStore.setPage(newPage)
          }
          productStore.loadProducts();
        }
      });

  };

  const filteredProducts = computed(() => {
    if (!searchTerm.value) return products.value;

    return products.value.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const categoryName = product.category?.name?.toLowerCase() || "";
      const term = searchTerm.value.toLowerCase();

      return name.includes(term) || categoryName.includes(term);
    });
  });

  return {
    //data
    categories,
    taxes,
    products,
    pagination,
    searchTerm,
    modal,
    selectedProduct,
    isLoading,

    // methods
    getCategories,
    getTaxes,
    getProducts,
    paginateProducts,
    openModal,
    closeModal,
    saveEditedProduct,
    saveNewProduct,
    deleteProduct,

    // computed
    filteredProducts,
  };
};
