import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

import { setupRouter } from './router'
import { setupStore } from './stores'
import { setupAxios } from './utils/http/axios/index';
import { setupRouterGuard } from './router/guard/index';
import { setupI18n } from './locales/setupI18n'
import { router } from './router/index';
// import filters from './utils/shared/filtersUtils';
import { setupErrorHandle } from './logica/gestion-errores'
import { initAppConfigStore } from './logica/initAppConfig'

const app = createApp(App)

//Configuración store
setupStore(app)

//Inicializar la configuración interna del sistema
initAppConfigStore()

//Configuración idioma
//TODO: 18n
//setupI18n(app)

//Configuración Axios HTTP
setupAxios(app)

//Configuración router
setupRouter(app)

//Configuración de rutas protegidas
setupRouterGuard(router);

//Configuración global gestión errores
setupErrorHandle(app);

//Añadimos los filtros
// app.config.globalProperties.$filters = filters

//Montamos/Instanciamos la aplicación web
app.mount('#app')
