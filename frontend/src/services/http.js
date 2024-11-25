import axios from "axios";
// import { API_URL } from "src/environment";
const API_URL = process.env;

class Http {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Http();
      console.log({ API_URL });
    }
    return this.instance;
  }

  async get(resource, headers) {
    try {
      const res = await this.axiosInstance.get(resource, {
        headers: {
          ...headers,
        },
      });
      return res.data;
    } catch (err) {
      console.log({ err });
      throw err;
    }
  }

  async post(resource, data, headers) {
    try {
      const res = await this.axiosInstance.post(resource, data, {
        headers: {
          ...headers,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  }

  async patch(resource, data, headers) {
    try {
      const res = await this.axiosInstance.patch(resource, data, {
        headers: {
          ...headers,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  }

  async delete(resource, headers) {
    try {
      const res = await this.axiosInstance.delete(resource, {
        headers: {
          ...headers,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  }
}

const HttpService = Http.getInstance();
export default HttpService;
