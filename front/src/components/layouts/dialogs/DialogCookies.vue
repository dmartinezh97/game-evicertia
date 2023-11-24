<script setup lang="ts">
import BasicButton from '@/components/ui/buttons/BasicButton.vue';
import { useUserStore } from '@/stores/modulos/user';

const userStore = useUserStore();

const aceptarCookies = () => {
    userStore.setCookies(true)
};

const onClickAbrirPoliticaDeCookies = () => {
    alert("Politica de cookies")
};

const onClickAbrirPreferenciaDeCookies = () => {
    alert("Preferencias de cookies")
};

</script>

<template>
    <div v-if="!userStore.getIsCookiesAcepted" class="fixed bottom-0 z-30 left-1/2 p-6 md:p-8 -translate-x-1/2 w-full max-w-screen-2xl">
        <div class="flex items-end justify-center">
            <!-- <DialogOverlay class="fixed inset-0 bg-black opacity-0" /> -->
            <div class="relative flex flex-col gap-y-4 lg:flex-row p-6 bg-white rounded-xl shadow-2xl">
                <div class="flex">
                    <div class="flex flex-col pr-4">
                        <div class="flex items-center text-base leading-none tracking-tight font-extrabold mb-2">
                            Tu privacidad
                            <span class="material-icons text-lg ml-2 text-blue-500">lock</span>
                        </div>
                        <p class="text-sm">Utilizamos cookies y tecnologías similares para ofrecer una mejor experiencia. Al hacer clic en Vale o activar una opción en las Preferencias de cookies, aceptas lo establecido en nuestra <span @click="onClickAbrirPoliticaDeCookies" class="font-bold underline underline-offset-2">Política de Cookies</span>. Para cambiar tus preferencias o retirar tu consentimiento, actualiza tus Preferencias de cookies.</p>
                    </div>
                </div>
                <div class="flex items-center">
                    <div class="flex gap-x-2">
                        <BasicButton @click="onClickAbrirPreferenciaDeCookies" text="Preferencias de cookies" class="min-w-[250px]" outlined></BasicButton>
                        <BasicButton @click="aceptarCookies" data-test="btnAceptarCookies" text="Vale" class="min-w-[150px]"></BasicButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>