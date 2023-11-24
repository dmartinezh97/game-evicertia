import type { App, ComponentPublicInstance } from "vue";
import projectSetting from "@/settings/projectSetting";
import { ErrorTypeEnum } from "@/enums/exceptionEnum";

/**
 * Controlar lo errores del stack
 * @param error
 */
 function processStackMsg(error: Error) {
  if (!error.stack) {
    return '';
  }
  let stack = error.stack
    .replace(/\n/gi, '') // Eliminar los saltos de línea para ahorrar el tamaño del contenido transmitido
    .replace(/\bat\b/gi, '@') // At en chrome, @ en ff
    .split('@') // Dividir la información con @
    .slice(0, 9) // La longitud máxima de la pila (Error.stackTraceLimit = 10), por lo que sólo toma los primeros 10
    .map((v) => v.replace(/^\s*|\s*$/g, '')) // Eliminar los espacios extra
    .join('~') // Añadir manualmente separadores para su posterior visualización
    .replace(/\?[^:]+/gi, ''); // Eliminar los parámetros redundantes de los enlaces a archivos js (?x=1 y similares)
  const msg = error.toString();
  if (stack.indexOf(msg) < 0) {
    stack = msg + '@' + stack;
  }
  return stack;
}

/**
 * Get nombre del componente
 * @param vm
 */
 function formatComponentName(vm: any) {
  if (vm.$root === vm) {
    return {
      name: 'root',
      path: 'root',
    };
  }

  const options = vm.$options as any;
  if (!options) {
    return {
      name: 'anonymous',
      path: 'anonymous',
    };
  }
  const name = options.name || options._componentTag;
  return {
    name: name,
    path: options.__file,
  };
}

/**
 * Configurar la función de manejo de errores de Vue
 */
function vueErrorHandler(err: unknown, vm: ComponentPublicInstance | null, info: string) {
  const { name, path } = formatComponentName(vm);
  // Puedo guardar el name, path en localStorage y enviar al back
}

/**
 * Configurar la gestión global de errores
 * @param app
 */
export function setupErrorHandle(app: App) {
  const { useErrorHandle } = projectSetting;
  if (!useErrorHandle) {
    return;
  }
  // Control de excepciones en Vue;
  app.config.errorHandler = vueErrorHandler;

  // Error de script
  // window.onerror = scriptErrorHandler;

  // Excepción de promesas
  // registerPromiseErrorHandler();

  // Excepción de recurso estático
  // registerResourceErrorHandler();
}
