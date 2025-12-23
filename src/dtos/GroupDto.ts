export interface GroupDto {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
}
export interface CreateGroupDto {
  name: string;
  description?: string;
  ownerId: string;
}
