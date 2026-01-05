import { useEffect, useState } from "react";

import type { AddGroupMemberDto } from "../dtos/GroupMemberDto";
import { groupMemberService } from "../services/groupMemberService";
import { usersService } from "../services/usersService";  
import type { UserDto } from "../dtos/UserDto";
import { groupsService } from "../services/groupsService";
import type { GroupDto } from "../dtos/GroupDto";

export default function GroupMemberPage() {
  const [groupId, setGroupId] = useState("");
  const [userId, setUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<UserDto[]>([]);
  const [groups, setGroups] = useState<GroupDto[]>([]);

  async function fetchUsers() {
      const allUsers = await usersService.getAll();
      setUsers(allUsers);
    }
  async function fetchGroups() {
      const allGroups = await groupsService.getAll();
      setGroups(allGroups);
    }

  useEffect(() => {
    async function fetchData() {
      await fetchUsers();
      await fetchGroups();
    }
    fetchData();
  }, []);



  async function handleAddMember(e: React.FormEvent) {
    e.preventDefault();

    if (!groupId.trim() || !userId.trim()) return;

    try {
      const addGroupMemberDto: AddGroupMemberDto = {
        groupId,
        userId,
        isAdmin,
      };
      await groupMemberService.addMember(addGroupMemberDto);
      alert("Membro adicionado com sucesso!");
      setGroupId("");
      setUserId("");
      setIsAdmin(false);
    } catch {
      alert("Erro ao adicionar membro ao grupo");
    }
  }

  return (
    <div>
      <h1>Adicionar Membro ao Grupo</h1>
      <form onSubmit={handleAddMember}>
        <div>
          <label>
            ID do Grupo:
            <select
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
            >
              <option value="">Selecione um grupo</option>
              {groups.map((g : GroupDto) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Nome do Usuário:
            <select
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            >
              <option value="">Selecione um usuário</option>
              {users.map((u : UserDto) => (
                <option key={u.id} value={u.id}>
                  {u.userName}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Administrador:
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </label>
        </div>
        <button type="submit">Adicionar Membro</button>
      </form>
    </div>
  );
}