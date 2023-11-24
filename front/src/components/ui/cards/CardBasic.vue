<script setup lang="ts">
import { Suspense } from 'vue';
import AnimatedPlaceholder from '../../AnimatedPlaceholder.vue';


defineProps({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
});

//await new Promise((res) => setTimeout(res, 60000));

</script>

<template>
    <Suspense>
        <template #default>
            <div class="evento-card">
                <!-- <div class="card-header" :style="'background-image: url(' + imgCabecera + ')'"></div> -->
                <div class="card-body">
                    <h3 class="title"> {{ title }} </h3>
                    <!-- <div class="fecha"> {{ $filters.formatDateBeautiful(fecha, "date") }} </div> -->
                </div>
            </div>
        </template>
        <template #fallback>
            <div class="evento-card">
                <div class="card-header">
                    <AnimatedPlaceholder height="100%" width="100%" />
                </div>
                <div class="card-body">
                    <AnimatedPlaceholder height="40px" width="100%" />
                </div>
            </div>
        </template>
    </Suspense>
</template>

<style scoped>
.evento-card {
    @apply flex flex-col items-center justify-center w-full max-w-md mx-auto;
}

.evento-card .card-header {
    @apply w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md;
}

.evento-card .card-body {
    @apply w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800;
}

.evento-card .card-body .title {
    @apply h-10 py-2 px-4 font-bold tracking-wide whitespace-nowrap text-ellipsis overflow-hidden text-center text-gray-800 uppercase dark:text-white;
}
.evento-card .card-body .fecha {
    @apply text-center capitalize px-3 py-2 bg-gray-200 dark:bg-gray-700;
}
</style>