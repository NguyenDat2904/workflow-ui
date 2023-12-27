import axios from 'axios';

class BaseServices {
   baseURL;
   http;
   configHeaders;

   constructor(baseURL, configHeaders) {
      this.http = axios.create({
         baseURL: baseURL,
         timeout: 100000,
      });
      this.baseURL = baseURL;
      this.configHeaders = configHeaders;
      this.http.interceptors.response.use(
         (response) => response,
         (error) => {
            const { response } = error;
            if (response) {
               switch (response.status) {
                  case 401:
                     localStorage.clear();
                     window.location.reload();
                     return;
                  case 403:
                     window.location.href = '/error403';
                     return;
                  default:
                     return Promise.reject(error);
               }
            }
            return Promise.reject(error);
         },
      );
   }
   setConfigHeaders() {
      const user = localStorage.getItem('user');
      const parseuser = JSON.parse(user);
      const config = {
         headers: {
            authorization: `${parseuser?.accessToken}`,
         },
         ...this.configHeaders,
      };
      return config;
   }
   get(url, configHeaders) {
      return this.http.get(url, { ...this.setConfigHeaders(), ...configHeaders });
   }
   post(url, data = {}, configHeaders) {
      return this.http.post(url, data, {
         ...this.setConfigHeaders(),
         ...configHeaders,
      });
   }
   put(url, data = {}, configHeaders) {
      return this.http.put(url, data, {
         ...this.setConfigHeaders(),
         ...configHeaders,
      });
   }
   delete(url, configHeaders) {
      return this.http.delete(url, {
         ...this.setConfigHeaders(),
         ...configHeaders,
      });
   }
}

export default BaseServices;