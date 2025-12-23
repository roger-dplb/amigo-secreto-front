// src/services/groupsService.ts
import {api} from "../api/api";
import type { CreateGroupDto, GroupDto } from "../dtos/GroupDto";

export const groupsService = {
  async getAll(): Promise<GroupDto[]> {
    const response = await api.get<GroupDto[]>("groups");
    console.log(response);
    return response.data;
  },

  async create(createGroupDto: CreateGroupDto): Promise<GroupDto> {
    const response = await api.post<GroupDto>("/groups", createGroupDto);
    return response.data;
  },
};
