import Api from "@/../../api/api";
import ApiRoutes from "@/../../api/api_routes";
import store from "@/store/store";
import axios from "axios";

const instance = axios.create()
instance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.getters['user/token']}`
    return config
}
);
export default new Api(ApiRoutes({ baseUrl: 'http://localhost:8080' }), instance, { lang: "ru" })