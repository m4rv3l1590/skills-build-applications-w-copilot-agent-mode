import ApiResourceTable from './ApiResourceTable';

function Users() {
  return (
    <ApiResourceTable
      endpointPath="users"
      title="Usuarios"
      logPrefix="Users"
      emptyMessage="No hay usuarios disponibles."
    />
  );
}

export default Users;