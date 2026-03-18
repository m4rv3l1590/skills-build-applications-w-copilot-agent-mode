import ApiResourceTable from './ApiResourceTable';

function Teams() {
  return (
    <ApiResourceTable
      endpointPath="teams"
      title="Equipos"
      logPrefix="Teams"
      emptyMessage="No hay equipos disponibles."
    />
  );
}

export default Teams;