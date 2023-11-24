import axios from 'axios';
import VueAxios from "vue-axios";
import type { App } from "vue";
import { getEnv, isDevMode } from '@/utils/shared/envUtils';
import { Http } from './Http';

export function setupAxios(app: App<Element>) {
  axios.defaults.baseURL = isDevMode() ? getEnv().VITE_APP_API_URL : getEnv().VITE_APP_API_URL;
  new Http.ApiJwtService();
  app.use(VueAxios, axios)
}