<script setup lang="ts">
import { PageEnum } from '@/enums/pageEnum';
import { router } from '@/router';
import { useNegocioStore } from '@/stores/modulos/negocio';
import { computed, onBeforeMount, onMounted, reactive } from 'vue';
import { useUserStore } from '../stores/modulos/user';
import BasicButton from './ui/buttons/BasicButton.vue';
import IconAdd from './icons/IconAdd.vue';
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const negocioStore = useNegocioStore();
const route = useRoute();

onBeforeMount(() => {
  //negocioStore.misNegocios()
})

const list = reactive({
  menu: [
    // {
    //   text: "Negocios",
    //   ruta: PageEnum.SELECCIONAR_NEGOCIO
    // },
  ]
})

const tengoQueMostrarme = computed(() => {
  return route.fullPath.match(/^\/negocios\/\d+\//);
})

</script>

<template>
  <template v-if="userStore.getIsLogged">
    <!-- && tengoQueMostrarme -->
    <!-- PARA SELECCIONAR EL LOCAL -->
    <div class="bg-white border-t border-gray-100">
      <!-- <nav class="flex items-center justify-center p-4 overflow-x-auto text-sm font-medium">
        <template v-for="item in list.menu">
          <router-link :to="{ name: item.ruta }" class="flex-shrink-0 pl-4 text-gray-900">
            {{item.text}}
          </router-link>
        </template>
      </nav> -->
      <nav class="flex sm:justify-center items-center border-b border-gray-200 overflow-x-auto text-sm font-medium">
        <router-link v-for="item in list.menu" :to="{ name: item.ruta }" class="flex-shrink-0 py-3 px-4 text-gray-900" active-class="bg-gray-200">
          {{item.text}}
        </router-link>
      </nav>
    </div>
  </template>
</template>