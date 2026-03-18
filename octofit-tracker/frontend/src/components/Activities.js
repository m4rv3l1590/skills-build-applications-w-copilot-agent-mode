import ApiResourceTable from './ApiResourceTable';

function Activities() {
  return (
    <ApiResourceTable
      endpointPath="activities"
      title="Actividades"
      logPrefix="Activities"
      emptyMessage="No hay actividades disponibles."
    />
  );
}

export default Activities;