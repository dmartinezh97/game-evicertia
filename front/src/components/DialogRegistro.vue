<script setup lang="ts">
import { ref, onMounted, onDeactivated, reactive } from 'vue';
import { Dialog, DialogOverlay, DialogTitle, DialogDescription } from '@headlessui/vue'
import BasicButton from './ui/buttons/BasicButton.vue'
import InputText from './ui/InputText.vue'
import { useUserStore } from '@/stores/modulos/user';
import type { SignupParams } from '@/api/model/userModel';
import { getEnv } from '@/utils/shared/envUtils';


const userStore = useUserStore();

const frmData: SignupParams = reactive({
    name: "demo",
    email: "demo@example.com",
    password: "P@ssw0rd1!.",
})

const props = defineProps<{
    modelValue: boolean
}>();

const emit = defineEmits(['update:modelValue', 'login'])
const setIsOpen = (value: boolean) => {
    emit('update:modelValue', value)
};

const onClickOpenLogin = () => {
    emit('login', true)
};

const onClickBtnLogin = async () => {
    const res = await userStore.signUp(frmData)
    if (res) {
        setIsOpen(false)
        /* TODO: Redireccionar a otro formulario para hacer la comprobación por correo o SMS */
    }
};

</script>

<template>
    <Dialog :open="props.modelValue" @close="setIsOpen" class="fixed inset-0 z-30 overflow-y-auto">
        <div class="flex items-center justify-center min-h-full py-8 px-1 md:p-8">
            <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
            <div class="relative w-full max-w-lg mx-auto bg-white rounded-xl">
                <div class="flex justify-center items-center h-16 border-b border-gray-200 px-3">
                    <h2 class="text-base leading-none tracking-tight font-extrabold">Regístrate</h2>
                    <button @click="setIsOpen(false)"
                        class="w-8 h-8 absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-none">
                        <span class="material-icons text-lg text-gray-500">close</span>
                    </button>
                </div>
                <div class="p-6">
                    <div class="mb-8">
                        <h3 class="font-semibold text-xl">¡Únete a {{ getEnv().VITE_APP_NAME }} hoy mismo!</h3>
                    </div>
                    <div>
                        <InputText label="Nombre" v-model="frmData.name"></InputText>
                        <!-- <InputText label="Apellidos" v-model="frmData.apellidos"></InputText>
                        <InputText label="Usuario" v-model="frmData.usuario"></InputText> -->
                        <InputText label="Correo electrónico" v-model="frmData.email" type="email"></InputText>
                        <InputText label="Contraseña" v-model="frmData.password" type="password"></InputText>
                        <!-- <InputText label="Confirmar contraseña" v-model="frmData.confirmPassword" type="password"></InputText> -->
                    </div>
                    <div>
                        <BasicButton @click="onClickBtnLogin" text="Crear cuenta" block></BasicButton>
                    </div>
                    <div class="my-4">
                        <div class="linea-o">o</div>
                    </div>
                    <div>
                        <button @click="onClickOpenLogin" class="w-full rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-sm font-normal px-3 py-3.5 leading-none transition ease-in duration-150">
                            Inicia sesión con el correo electrónico
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>