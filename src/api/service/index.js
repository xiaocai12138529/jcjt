import axios from "axios";
import { message } from "ant-design-vue";
import router from "@/router";
import storage from "@/utils/storage";
export default class Service {
  constructor(config) {
    this.config = config;
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    // 公共拦截器
    this.instance.interceptors.request.use((config) => {
      const token = storage.getStorage("_token");
      if (token) {
          config.headers["Authorization"]=`Bearer ${token}`
      }
      return config;
    });

    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data;
        if (data.status === 200||data.code === 200) {
          if(data.success){
            return data.data || data.response || [];
          }else{
            return message.error(data.message);
          }
        } else if (data.status === 500||data.code === 500) {
          message.error(data.message);
          return Promise.reject();
        } else {
          if(res?.config?.responseType=='blob'){
            return data;
          }else{
            message.error(data.message?data.message:"请求失败，请重试");
            return Promise.reject();
          }
        }
      },
      (err) => {
        console.log(err)
        if (err.response?.status === 401 ||err.response?.status === 0) {
          router.replace("/login");
          message.error("登录过期，请重新登录");
          return Promise.reject(err);
        }else{
           message.error(err.message);
          return Promise.reject(err);
        }
      }
    );
  }

  // 实例方法
  request(config){
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get(config) {
    return this.request({ ...config, method: "GET" });
  }

  post(config) {
    return this.request({ ...config, method: "POST" });
  }

  delete(config) {
    return this.request({ ...config, method: "DELETE" });
  }
  download(config) {
    return this.request({ ...config, method: "GET",responseType:"blob",headers: { "Content-type": "multipart/form-data" }});
  }
  upload(config) {
    return this.request({ ...config, method: "POST", headers: { "Content-type": "multipart/form-data" } });
  }
}
