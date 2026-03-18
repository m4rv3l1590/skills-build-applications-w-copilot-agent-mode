import { useCallback, useEffect, useMemo, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function normalizeData(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.results)) {
    return data.results;
  }

  return [];
}

function getColumns(items) {
  const keySet = new Set();
  items.slice(0, 10).forEach((item) => {
    if (item && typeof item === 'object') {
      Object.keys(item).forEach((key) => keySet.add(key));
    }
  });

  const preferredOrder = ['id', '_id', 'name', 'username', 'title', 'created_at', 'updated_at'];
  const ordered = preferredOrder.filter((key) => keySet.has(key));
  const rest = [...keySet].filter((key) => !preferredOrder.includes(key)).sort();
  const columns = [...ordered, ...rest];

  return columns.slice(0, 6);
}

function formatValue(value) {
  if (value === null || value === undefined) {
    return '-';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

function ApiResourceTable({ endpointPath, title, logPrefix, emptyMessage }) {
  const endpoint = `${API_BASE}/${endpointPath}/`;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      console.log(`[${logPrefix}] Fetch endpoint:`, endpoint);

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const normalizedData = normalizeData(data);

      console.log(`[${logPrefix}] Raw data:`, data);
      console.log(`[${logPrefix}] Normalized data:`, normalizedData);

      setItems(normalizedData);
    } catch (err) {
      console.error(`[${logPrefix}] Error fetching data:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, logPrefix]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return items;
    }

    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      const serialized = JSON.stringify(item).toLowerCase();
      return serialized.includes(normalizedQuery);
    });
  }, [items, query]);

  const columns = useMemo(() => getColumns(filteredItems), [filteredItems]);

  return (
    <section className="octofit-section">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white d-flex flex-wrap align-items-center justify-content-between gap-2">
          <h2 className="h4 mb-0 text-primary">{title}</h2>
          <a
            href={endpoint}
            className="link-primary fw-semibold"
            target="_blank"
            rel="noreferrer"
          >
            Ver endpoint API
          </a>
        </div>

        <div className="card-body">
          <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
            <div className="col-12 col-md-8">
              <label htmlFor={`${endpointPath}-search`} className="form-label mb-1">
                Buscar en resultados
              </label>
              <input
                id={`${endpointPath}-search`}
                type="text"
                className="form-control"
                placeholder={`Filtrar ${title.toLowerCase()}...`}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="col-12 col-md-4 d-flex align-items-end gap-2">
              <button type="button" className="btn btn-primary" onClick={loadItems}>
                Refrescar
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => setQuery('')}>
                Limpiar
              </button>
            </div>
          </form>

          {loading && <div className="alert alert-info mb-0">Cargando datos...</div>}
          {!loading && error && <div className="alert alert-danger mb-0">Error: {error}</div>}

          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    {columns.length === 0 && <th>Dato</th>}
                    {columns.map((column) => (
                      <th key={`${endpointPath}-column-${column}`}>{column}</th>
                    ))}
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.length === 0 && (
                    <tr>
                      <td colSpan={Math.max(columns.length + 1, 2)}>{emptyMessage}</td>
                    </tr>
                  )}

                  {filteredItems.map((item, index) => (
                    <tr key={item?.id ?? item?._id ?? `${endpointPath}-${index}`}>
                      {columns.length === 0 && <td>{formatValue(item)}</td>}
                      {columns.map((column) => (
                        <td key={`${endpointPath}-${index}-${column}`}>{formatValue(item?.[column])}</td>
                      ))}
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setSelectedItem(item)}
                        >
                          Ver detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedItem && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">Detalle de {title}</h3>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedItem(null)}
                  />
                </div>
                <div className="modal-body">
                  <pre className="mb-0">{JSON.stringify(selectedItem, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setSelectedItem(null)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelectedItem(null)} />
        </>
      )}
    </section>
  );
}

export default ApiResourceTable;