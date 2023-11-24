import type { Router } from 'vue-router';
import { useUserStore } from '../../stores/modulos/user';
import { PageEnum } from '../../enums/pageEnum';


export function createPermissionGuard(router: Router) {
    const userStore = useUserStore();
    router.beforeEach(async (to, from, next) => {
        
        /* Utilizamos to.matched para no tener que repetir el meta.requiresAuth en todas las rutas */
        if(to.matched.some((record) => record.meta.requiresAuth)){
            if(!userStore.getIsLogged){
                //TODO: Enviar a pantalla con mensaje informativo para iniciar sesión, parametro ?redirect= con la url de donde viene
                next({ name: PageEnum.INICIO })
                return
            }
        }

        // if(requiresAuth && !isLogged){
        // }else{
        //     next();
        // }
        next();
    });
}