import axios, {
  AxiosInstance,
  AxiosError,
} from "axios";
import { tokenManager } from "./tokenManager";
import { idManager } from "./idManager";
import {url} from "../../variables";

const apiClient: AxiosInstance = axios.create({
  baseURL: url,
  timeout: 200000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
});


apiClient.interceptors.request.use((config) => {

  const accessToken = tokenManager.getAccessToken();
  if (accessToken){
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (config.botId) config.headers['X-bot-id'] = idManager.getBotId()
  if (config.chatId) config.headers["X-chat-id"] = idManager.getChatId()

  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      tokenManager.handleSessionExpiration("unauthorized");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
