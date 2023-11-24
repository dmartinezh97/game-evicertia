import { useAppStore } from "@/stores/modulos/app";
import { useUserStore } from "@/stores/modulos/user";
import type { RouteLocationNormalized, Router } from "vue-router";
import { createPermissionGuard } from "./permissionGuard";


// No cambiar el orden de creación
export function setupRouterGuard(router: Router) {
    //createPageGuard(router);
    //createPageLoadingGuard(router);
    //createHttpGuard(router);
    //createScrollGuard(router); /* Funcionaba antes de tener la página con un div interior en flex */
    //createMessageGuard(router);
    //createProgressGuard(router);
    createPermissionGuard(router);
    //createParamMenuGuard(router);
    //createStateGuard(router);
}

/**
 * Hooks para controlar el estado de la página
 */
function createPageGuard(router: Router) {
    const loadedPageMap = new Map<string, boolean>();

    router.beforeEach(async (to) => {
        // La página ya ha sido cargada, será más rápido abrirla de nuevo, no es necesario hacer la carga y otros procesamientos
        to.meta.loaded = !!loadedPageMap.get(to.path);
        // TODO: Notificar los cambios de ruta

        return true;
    });

    router.afterEach((to) => {
        loadedPageMap.set(to.path, true);
    });
}

function createPageLoadingGuard(router: Router) {
    const userStore = useUserStore();
    const appStore = useAppStore();
    //const { getOpenPageLoading } = useTransitionSetting();

    // router.beforeResolve(async (to) => {
    //     if(to.name){
    //         appStore.setPageLoading(true);
    //     }
    //     return true;
    // });

    router.beforeEach(async (to) => {
        if (!userStore.getToken) {
            return true;
        }
        if (to.meta.loaded) {
            return true;
        }
        //appStore.setPageLoading(true);


        // if (unref(getOpenPageLoading)) {
        //     appStore.setPageLoadingAction(true);
        //     return true;
        // }

        return true;
    });
    router.afterEach(async () => {
        return true;
    });
}

// En el cambio de ruta volver a la parte superior de la página
function createScrollGuard(router: Router) {
    const isHash = (href: string) => {
        return /^#/.test(href);
    };

    const body = document.body;

    router.afterEach(async (to) => {
        isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(800, 800);
        return true;
    });
}