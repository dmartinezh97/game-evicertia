import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
import { gameModule } from '@/views/game';
import BaseViewVue from '@/views/app/BaseView.vue';
import { PageEnum } from '@/enums/pageEnum';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: PageEnum.BASE_INICIO,
      component: BaseViewVue,
      children: [
        ...gameModule.routes,
      ]
    },
  ]
})

//Config router
export function setupRouter(app: App<Element>) {
  app.use(router);
}