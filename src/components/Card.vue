<template>
    <div class="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <slot name="header"></slot>
        <div class="p-4">
            <slot></slot>
        </div>
        <slot name="footer"></slot>
    </div>
</template>