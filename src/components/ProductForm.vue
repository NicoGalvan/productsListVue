<script setup>
import { useProducts } from '../composables/useProducts';
const { categories, taxes, saveEditedProduct, saveNewProduct } = useProducts()
import { ref, computed } from 'vue';

const props = defineProps({
    product: {
        type: Object,
        default: () => null,
    },
});

const form = ref({
    id_category: props.product?.category._id || '',
    barcode: props.product?.barcode || '',
    name: props.product?.name || '',
    presentation: props.product?.presentation || '',
    reference: props.product?.reference || '',
    description: props.product?.description || '',
    service: props.product?.service || false,
    selling_price: props.product?.selling_price || '',
    product_cost: props.product?.product_cost || '',
    taxes: props.product?.taxes ? props.product.taxes.map(tax => ({ ...tax })) : [], // Cargar impuestos
});

// Errores de validación
const formErrors = ref({
    id_category: '',
    barcode: '',
    name: '',
    presentation: '',
    reference: '',
    description: '',
    selling_price: '',
    product_cost: '',
});

// Computado para detectar el modo (crear/editar)
const isEditMode = computed(() => !!props.product);

const toggleTaxSelection = (tax) => {
    if (isTaxSelected(tax.code, tax.percentage)) {
        form.value.taxes = form.value.taxes.filter(
            (t) => t.code !== tax.code || t.percentage !== tax.percentage
        );
    } else {
        form.value.taxes.push(tax);
    }
};

// Función para comprobar si el impuesto ya está seleccionado
const isTaxSelected = (code, percentage) => {
    return form.value.taxes.some(t => t.code === code && t.percentage === percentage);
};

// Función para validar los campos
const validateForm = () => {
    let isValid = true;

    // Limpiar errores previos
    formErrors.value = {
        id_category: '',
        barcode: '',
        name: '',
        presentation: '',
        reference: '',
        description: '',
        selling_price: '',
        product_cost: '',
    };

    // Validar categoría
    if (!form.value.id_category) {
        formErrors.value.id_category = 'La categoría es obligatoria';
        isValid = false;
    }

    // Validar código de barras
    if (!form.value.barcode) {
        formErrors.value.barcode = 'El código de barras es obligatorio';
        isValid = false;
    }

    // Validar nombre
    if (!form.value.name) {
        formErrors.value.name = 'El nombre es obligatorio';
        isValid = false;
    }

    // Validar presentación
    if (!form.value.presentation) {
        formErrors.value.presentation = 'La presentación es obligatoria';
        isValid = false;
    }

    // Validar referencia
    if (!form.value.reference) {
        formErrors.value.reference = 'La referencia es obligatoria';
        isValid = false;
    }

    // Validar descripción
    if (!form.value.description) {
        formErrors.value.description = 'La descripción es obligatoria';
        isValid = false;
    }

    // Validar precio de venta
    if (!form.value.selling_price || form.value.selling_price <= 0) {
        formErrors.value.selling_price = 'El precio de venta debe ser un número mayor que 0';
        isValid = false;
    }

    // Validar costo
    if (!form.value.product_cost || form.value.product_cost <= 0) {
        formErrors.value.product_cost = 'El costo debe ser un número mayor que 0';
        isValid = false;
    }

    return isValid;
};

// Función para manejar el envío del formulario
const submitForm = () => {
    if (validateForm()) {
        const payload = {
            ...form.value,
            taxes: form.value.taxes.map(tax => ({
                code: tax.code,
                name: tax.name,
                percentage: tax.percentage
            }))
        };
        if (isEditMode.value) {
            saveEditedProduct(payload, props.product?._id)
            return
        }
        saveNewProduct(payload)
    }
};
</script>

<template>
    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">
            {{ isEditMode ? 'Editar Producto' : 'Crear Producto' }}
        </h2>
        <form @submit.prevent="submitForm" class="space-y-4 overflow-auto max-h-[80vh]">
            <!-- Grid de dos columnas -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <!-- Categoría -->
                <div>
                    <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
                        Categoría
                    </label>
                    <select id="category" v-model="form.id_category"
                        class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="" disabled>Seleccione una categoría</option>
                        <option v-for="category in categories" :key="category.id" :value="category._id">
                            {{ category.name }}
                        </option>
                    </select>
                    <p v-if="formErrors.id_category" class="text-sm text-red-600 mt-1">{{ formErrors.id_category }}</p>
                </div>

                <!-- Código de barras -->
                <div>
                    <label for="barcode" class="block text-sm font-medium text-gray-700 mb-1">
                        Código de barras
                    </label>
                    <input id="barcode" type="text" v-model="form.barcode"
                        class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ingrese el código de barras" />
                    <p v-if="formErrors.barcode" class="text-sm text-red-600 mt-1">{{ formErrors.barcode }}</p>
                </div>

                <!-- Nombre -->
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                        Nombre
                    </label>
                    <input id="name" type="text" v-model="form.name"
                        class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ingrese el nombre del producto" />
                    <p v-if="formErrors.name" class="text-sm text-red-600 mt-1">{{ formErrors.name }}</p>
                </div>

                <!-- Presentación -->
                <div>
                    <label for="presentation" class="block text-sm font-medium text-gray-700 mb-1">
                        Presentación
                    </label>
                    <input id="presentation" type="text" v-model="form.presentation"
                        class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ingrese la presentación" />
                    <p v-if="formErrors.presentation" class="text-sm text-red-600 mt-1">{{ formErrors.presentation }}
                    </p>
                </div>

                <!-- Referencia -->
                <div>
                    <label for="reference" class="block text-sm font-medium text-gray-700 mb-1">
                        Referencia
                    </label>
                    <input id="reference" type="text" v-model="form.reference"
                        class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ingrese la referencia" />
                    <p v-if="formErrors.reference" class="text-sm text-red-600 mt-1">{{ formErrors.reference }}</p>
                </div>

                <!-- Descripción -->
                <div>
                    <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                        Descripción
                    </label>
                    <textarea id="description" v-model="form.description"
                        class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="3" placeholder="Ingrese una descripción"></textarea>
                    <p v-if="formErrors.description" class="text-sm text-red-600 mt-1">{{ formErrors.description }}</p>
                </div>
            </div>

            <!-- Impuestos -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Impuestos</label>
                <div class="grid grid-cols-2 gap-2">
                    <div v-for="tax in taxes" :key="tax.code + '-' + tax.percentage" class="flex items-center">
                        <input type="checkbox" :checked="isTaxSelected(tax.code, tax.percentage)"
                            @change="toggleTaxSelection(tax)" id="tax-{{ tax.code }}-{{ tax.percentage }}"
                            class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        <label :for="'tax-' + tax.code + '-' + tax.percentage" class="ml-2 text-sm text-gray-700">
                            {{ tax.name }} ({{ tax.percentage }}%)
                        </label>
                    </div>
                </div>
            </div>

            <!-- Precio de venta -->
            <div>
                <label for="selling_price" class="block text-sm font-medium text-gray-700 mb-1">
                    Precio de venta
                </label>
                <input id="selling_price" type="number" v-model="form.selling_price"
                    class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ingrese el precio de venta" />
                <p v-if="formErrors.selling_price" class="text-sm text-red-600 mt-1">{{ formErrors.selling_price }}</p>
            </div>

            <!-- Costo -->
            <div>
                <label for="product_cost" class="block text-sm font-medium text-gray-700 mb-1">
                    Costo
                </label>
                <input id="product_cost" type="number" v-model="form.product_cost"
                    class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ingrese el costo" />
                <p v-if="formErrors.product_cost" class="text-sm text-red-600 mt-1">{{ formErrors.product_cost }}</p>
            </div>

            <div class="flex justify-end mt-6">
                <button type="submit"
                    class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    {{ isEditMode ? 'Actualizar' : 'Crear' }}
                </button>
            </div>
        </form>
    </div>
</template>
