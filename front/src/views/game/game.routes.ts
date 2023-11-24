import type { RouteRecordRaw } from "vue-router"
import GameViewVue from "./GameView.vue"

const routes: RouteRecordRaw[] = [
    {
        path: '',
        name: 'Inicio',
        component: GameViewVue
    },
]

export default routes