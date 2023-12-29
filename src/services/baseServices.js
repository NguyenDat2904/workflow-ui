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
                  case 400:
                     return response;
                  case 401:
                     localStorage.clear();
                     window.location.reload();
                     return;
                  case 403:
                     window.location.href = '/error403';
                     return;
                  case 404:
                     return response;
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
   setConfigHeadersUpload() {
      const user = localStorage.getItem('user');
      const parseuser = JSON.parse(user);
      const config = {
         headers: {
            authorization: `${parseuser?.accessToken}`,
            'Content-Type': 'multipart/form-data',
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
   patch(url, data = {}, configHeaders) {
      return this.http.patch(url, data, {
         ...this.setConfigHeaders(),
         ...configHeaders,
      });
   }
   patchUpload(url, data, configHeaders) {
      return this.http.patch(url, data, {
         ...this.setConfigHeadersUpload(),
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
