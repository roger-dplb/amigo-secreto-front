import {api} from "../api/api";
import type { AddGroupMemberDto } from "../dtos/GroupMemberDto";
export const groupMemberService = {
  async addMember(addGroupMemberDto: AddGroupMemberDto): Promise<void> {
    await api.post("/groupmembers", addGroupMemberDto);
  },
};