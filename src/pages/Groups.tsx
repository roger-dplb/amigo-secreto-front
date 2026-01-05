import { useEffect, useState } from "react";

import type { GroupDto } from "../dtos/GroupDto";
import type { UserDto } from "../dtos/UserDto";
import { groupsService } from "../services/groupsService";
import { usersService }  from "../services/usersService";
 
export default function Groups() {
  const [groups, setGroups] = useState<GroupDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [users, setUsers] = useState<UserDto[]>([]);

  async function loadGroups() {
    try {
      setLoading(true);
      const data = await groupsService.getAll();
      setGroups(data);
    } catch {
      setError("Erro ao carregar grupos");
    } finally {
      setLoading(false);
    }
  }
  async function loadUsers() {
    try {
      setLoading(true);
      const data = await usersService.getAll();
      setUsers(data);
    } catch {
      setError("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateGroup(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      const newGroup = await groupsService.create({
        name,
        description: description.trim() ? description : undefined,
        ownerId,
      });
      setGroups((prev) => [...prev, newGroup]);
      setName("");
      setDescription("");
      setOwnerId("");
    } catch {
      alert("Erro ao criar grupo");
    }
  }
  function handleUserNames(ownerId:string) {
    const user = users.find(u => u.id === ownerId);
    return user ? user.userName : "Desconhecido";
    
  }

  useEffect(() => {
    loadGroups();
    loadUsers();
  }, []);

  if (loading) return <p>Carregando grupos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Meus Grupos</h1>

      {/* Formulário */}
      <form onSubmit={handleCreateGroup} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Nome do grupo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          value={ownerId}
          onChange={(e) => setOwnerId(e.target.value)}
        >
          <option value="">Selecione o dono do grupo</option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.userName}
              </option>
            ))}
        </select>

        <button type="submit">Criar Grupo</button>
      </form>

      {/* Lista */}
      {groups.length === 0 ? (
        <p>Nenhum grupo cadastrado</p>
      ) : (
        <ul>
          {groups.map((group, index) => (
            <li key={`${group.id}`}>
              <strong>{index + 1}. {group.name}</strong>
              {group.description && <p>{group.description}</p>}
              {group.ownerId && <p>Dono do grupo: {handleUserNames(group.ownerId)}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
