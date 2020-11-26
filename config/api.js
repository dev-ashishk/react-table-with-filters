import axios from "axios";

const axiosInstance = (__config = {}, baseUrl = "") => {
    const instance = axios.create({
        baseURL: `${baseUrl}/api`,
        ...__config
    });
    instance.interceptors.request.use((request) => request, (error) => {
        console.log("Logging Error", error);
    });
    instance.interceptors.response.use((response) => {
        const { config, status } = response;
        console.log(`${config.url} ${config.method.toUpperCase()} ${status}`);
        return response;
    }, (error) => {
        console.log("Logging Error", error);
    });
    return instance;
};

export default axiosInstance;
