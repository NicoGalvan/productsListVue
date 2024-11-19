<template>
    <div class="overflow-x-auto max-h-[60vh]">
        <table class="min-w-full">
            <thead class="bg-primary text-white sticky top-0 z-10">
                <tr>
                    <th v-for="(column, index) in columns" :key="index"
                        class="px-4 py-2 text-left text-sm font-semibold border-b border-gray-300">
                        {{ column }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <slot></slot>
            </tbody>
        </table>
    </div>
</template>

<script setup>
defineProps(['columns'])
</script>
