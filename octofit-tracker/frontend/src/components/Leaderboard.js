import ApiResourceTable from './ApiResourceTable';

function Leaderboard() {
  return (
    <ApiResourceTable
      endpointPath="leaderboard"
      title="Leaderboard"
      logPrefix="Leaderboard"
      emptyMessage="No hay datos de leaderboard."
    />
  );
}

export default Leaderboard;