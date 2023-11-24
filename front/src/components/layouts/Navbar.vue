<script setup lang="ts">
import { PageEnum } from '@/enums/pageEnum';
import { router } from '@/router';
import { Menu, MenuButton, MenuItems, MenuItem, Popover, PopoverButton, PopoverPanel, PopoverOverlay, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { computed, ref, reactive } from 'vue';
import { useUserStore } from '../../stores/modulos/user';
import BasicButton from '../ui/buttons/BasicButton.vue';
import SidebarEmpresa from '../SidebarEmpresa.vue';
import DialogRegistro from '../DialogRegistro.vue';
import DialogLogin from '../DialogLogin.vue';
import { listadoMenuPrincipal } from '@/data/menu';

const showModalRegistro = ref(false);
const showModalLogin = ref(false);

const userStore = useUserStore();

const onClickBtnInicio = () => {
  router.push({
    name: PageEnum.INICIO
  });
};

const onClickBtnLogin = () => {
  showModalRegistro.value = false;
  showModalLogin.value = true;
};

const onClickBtnRegistro = () => {
  showModalLogin.value = false;
  showModalRegistro.value = true;
};

const onClickCerrarSesion = () => {
  userStore.resetState();
};

// const onClickGoToPanelAdministrador = () => {
//   //TODO: Añadir ruta para ir al panel de administrador
//   router.push({
//     name: PageEnum.ADMIN_DASHBOARD
//   });
// };

</script>

<template>
  <header class="sticky top-0 z-30 bg-white shadow-md">
    <div class="container h-16 flex items-center justify-between px-6 mx-auto">
      <!-- Navbar móvil -->
      <Popover class="flex flex-1 w-0 lg:hidden">
        <PopoverButton as="div">
          <span class="material-icons text-gray-600 bg-gray-100 rounded-full p-2">menu</span>
        </PopoverButton>
        <PopoverOverlay class="bg-black opacity-30 z-40 fixed inset-0" />

        <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-1 opacity-0"
          enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-100 ease-in"
          leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
          <PopoverPanel class="fixed top-0 left-0 z-40 bg-white w-64 h-full flex flex-col justify-between">
            <div class="flex flex-col">
              <div @click="onClickBtnInicio" class="flex justify-center items-center">
                <img src="@/assets/img/png/logo_dalle.png" alt="Logo App" class="w-20 h-20" />
              </div>
              <div class="flex flex-col justify-between divide-y divide-gray-200">
                <nav class="mb-2">
                  <PopoverButton as="div" v-for="item in listadoMenuPrincipal">
                    <router-link class="flex items-center px-4 py-2" active-class="bg-gray-200"
                      :to="{ name: item.route }">
                      <span class="mx-4 font-medium">{{ item.label }}</span>
                    </router-link>
                  </PopoverButton>
                </nav>
                <nav class="mb-2">
                  <!-- <PopoverButton as="div">
                  <router-link active-class="bg-gray-200" :to="{ name: PageEnum.SELECCIONAR_NEGOCIO }" class="flex items-center px-4 py-2 mt-2 text-gray-600 transition-colors duration-200 transform">
                    <span class="material-icons">post_add</span>  
                    <span class="mx-4 font-medium">Añade tu negocio</span>
                  </router-link>
                </PopoverButton> -->
                  <a href="https://certificates.dev/vuejs/certificates/9a8efd3d-50db-4014-b836-e49ecc94d49a" target="_blank" 
                  class="flex items-center px-4 py-2 mt-2 text-gray-600 transition-colors duration-200 transform">
                    <span class="material-icons">verified</span>
                    <span class="mx-4 font-medium">Certificado Vue.js</span>
                  </a>
                </nav>
              </div>
            </div>
            <div v-if="userStore.getIsLogged" class="p-2">
              <PopoverButton as="div" v-for="item in listadoMenuPrincipal">
                <BasicButton text="Cerrar sesión" block @click="onClickCerrarSesion">
                  <template v-slot:icon>
                    <span class="material-icons mr-5">logout</span>
                  </template>
                </BasicButton>
              </PopoverButton>
            </div>
            <div v-else class="py-4">
              <div @click="onClickBtnRegistro" class="flex items-center px-4 py-2 mb-2 text-gray-600">
                <span class="material-icons">app_registration</span>
                <span class="mx-4 font-medium">Regístrate</span>
              </div>
              <div @click="onClickBtnLogin" class="flex items-center px-4 py-2 text-gray-600">
                <span class="material-icons">login</span>
                <span class="mx-4 font-medium">Iniciar sesión</span>
              </div>
            </div>
          </PopoverPanel>
        </transition>
      </Popover>
      <!-- Fin Navbar móvil -->
      <div @click="onClickBtnInicio" class="flex items-center lg:flex-1 space-x-4 cursor-pointer">
        <img src="@/assets/img/png/logo_dalle.png" alt="Logo App" class="w-16 h-16" />
      </div>
      <!-- Lupa -->
      <div class="flex justify-end flex-1 w-0 lg:hidden">
        <button class="p-2 text-gray-500 bg-gray-100 rounded-full" type="button">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              fill-rule="evenodd" />
          </svg>
        </button>
      </div>
      <!-- Fin Lupa -->
      <nav class="items-center justify-center hidden space-x-8 text-sm font-medium lg:flex lg:flex-1 lg:w-0">
        <router-link v-for="item in listadoMenuPrincipal" :to="{ name: item.route }">{{ item.label }}</router-link>
      </nav>
      <div class="lg:flex lg:flex-1 justify-end items-center hidden">
        <span
          class="material-icons text-lg text-gray-400 hover:bg-gray-200/60 p-3 rounded-full leading-none">language</span>
        <Menu as="div" class="relative inline-block text-left ml-2">
          <MenuButton data-test="btnMenu"
            class="flex items-center border border-gray-300 shadow-sm hover:shadow-md pl-3 p-1 rounded-full">
            <span class="material-icons text-lg text-gray-400">menu</span>
            <span class="material-icons text-3xl leading-none text-gray-400 ml-3 rounded-full">account_circle</span>
          </MenuButton>
          <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <MenuItems
              class="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="py-2">
                <template v-if="userStore.getIsLogged">
                  <!-- <MenuItem v-slot="{ active }">
                  <button @click="onClickGoToPanelAdministrador" data-test="btnPanelAdministrador"
                    :class="[active ? 'bg-gray-200' : 'text-gray-900', 'group flex items-center w-full px-4 py-2 text-sm']">
                    <span class="material-icons text-lg mr-4 text-gray-600">admin_panel_settings</span>
                    Panel administrador
                  </button>
                  </MenuItem> -->
                  <MenuItem v-slot="{ active }">
                  <button @click="onClickCerrarSesion" data-test="btnCerrarSesion"
                    :class="[active ? 'bg-gray-200' : 'text-gray-900', 'group flex items-center w-full px-4 py-2 text-sm']">
                    <span class="material-icons text-lg mr-4 text-gray-600">logout</span>
                    Cerrar sesión
                  </button>
                  </MenuItem>
                </template>
                <template v-else>
                  <MenuItem v-slot="{ active }">
                  <button @click="onClickBtnRegistro"
                    :class="[active ? 'bg-gray-200' : 'text-gray-900', 'group flex items-center w-full px-4 py-2 text-sm']">
                    <span class="material-icons text-lg mr-4 text-gray-600">app_registration</span>
                    Regístrate
                  </button>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                  <button @click="onClickBtnLogin" data-test="btnLogin"
                    :class="[active ? 'bg-gray-200' : 'text-gray-900', 'group flex items-center w-full px-4 py-2 text-sm']">
                    <span class="material-icons text-lg mr-4 text-gray-600">login</span>
                    Iniciar sesión
                  </button>
                  </MenuItem>
                </template>
              </div>
              <div class="py-2">
                <MenuItem v-slot="{ active }">
                <a href="https://certificates.dev/vuejs/certificates/9a8efd3d-50db-4014-b836-e49ecc94d49a" target="_blank"
                  :class="[active ? 'bg-gray-200' : 'text-gray-900', 'group flex items-center w-full px-4 py-2 text-sm']">
                  <span class="material-icons text-lg mr-4 text-gray-600">verified</span>
                  Certificado Vue.js
                </a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
    <DialogLogin v-model="showModalLogin" @registro="onClickBtnRegistro"></DialogLogin>
    <DialogRegistro v-model="showModalRegistro" @login="onClickBtnLogin"></DialogRegistro>
  </header>
</template>