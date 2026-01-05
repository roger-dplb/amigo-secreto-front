import {api} from "../api/api";
import type { UserDto } from "../dtos/UserDto";

export const usersService = {
  async getAll(): Promise<UserDto[]> {
    const response = await api.get<UserDto[]>("users");
    console.log(response.data);
    return response.data;
  },
};