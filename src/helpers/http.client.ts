import axios, { Axios } from 'axios';

const http = axios.create({});

export function HttpClient() {
  class BaseHttpClient {
    private http = axios;

    static get<T>(path: string) {
      return http.get(path);
    }

    static post<T>(path: string, payload: object) {
      return http.post(path, payload);
    }

    static handler(http: Axios) {}
  }

  return BaseHttpClient;
}
