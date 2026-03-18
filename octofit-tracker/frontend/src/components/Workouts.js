import ApiResourceTable from './ApiResourceTable';

function Workouts() {
  return (
    <ApiResourceTable
      endpointPath="workouts"
      title="Workouts"
      logPrefix="Workouts"
      emptyMessage="No hay workouts disponibles."
    />
  );
}

export default Workouts;