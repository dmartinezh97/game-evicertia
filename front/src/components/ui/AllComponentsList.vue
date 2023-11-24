<script setup lang="ts">
import BasicButton from './buttons/BasicButton.vue';

const onClickButton = (str: String) => {
  alert(str);
};

</script>

<template>
    <div class="space-y-6 pb-12 p-4 mx-auto max-w-2xl text-slate-900">
        <div class="space-y-1">
            <h3 class="font-medium text-sm">Buttons</h3>
            <div class="flex items-center space-x-2 p-2 border-dashed border-gray-300 border bg-white">
                <div class="space-y-2 w-full">
                    <div
                        class="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-center sm:space-y-0 sm:space-x-4 sm:flex-row sm:items-end sm:justify-center">
                        <BasicButton text="Primary" @click="onClickButton('Has hecho click en el botón primario')"></BasicButton>
                        <BasicButton text="Outlined" outlined @click="onClickButton('Has hecho click en el botón outlined')"></BasicButton>
                        <BasicButton text="Shadow" shadow :rounded="false" @click="onClickButton('Has hecho click en el botón shadow')"></BasicButton>
                        <BasicButton text="Rounded" rounded @click="onClickButton('Has hecho click en el botón rounded')"></BasicButton>
                        <BasicButton text="Loading" loading @click="onClickButton('Has hecho click en el botón loading')"></BasicButton>
                    </div>
                    <div
                        class="max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-center sm:space-y-0 sm:space-x-4 sm:flex-row sm:items-end sm:justify-center">
                        <BasicButton text="Primary" disabled @click="onClickButton('Has hecho click en el botón primario')"></BasicButton>
                        <BasicButton text="Outlined" disabled outlined @click="onClickButton('Has hecho click en el botón outlined')"></BasicButton>
                        <BasicButton text="Shadow" disabled shadow :rounded="false" @click="onClickButton('Has hecho click en el botón shadow')"></BasicButton>
                        <BasicButton text="Rounded" disabled rounded @click="onClickButton('Has hecho click en el botón rounded')"></BasicButton>
                        <BasicButton text="Loading" disabled loading @click="onClickButton('Has hecho click en el botón loading')"></BasicButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>