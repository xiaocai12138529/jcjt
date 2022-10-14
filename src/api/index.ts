import Service from './service'
export default new Service({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 1000 * 20,
  // interceptors: {
  //   request: (config) => {
  //     const token = storage.getStorage("_token");
  //     if (token) {
  //       config.headers.token = token;
  //     }
  //     return config;
  //   }
  // }
})
