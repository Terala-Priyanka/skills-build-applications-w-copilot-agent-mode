import { useEffect, useState } from 'react';

const apiBaseUrl = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

const endpoint = `${apiBaseUrl}/leaderboard/`;

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        console.log('Leaderboard endpoint:', endpoint);
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to fetch leaderboard: ${response.status}`);
        }

        const payload = await response.json();
        console.log('Leaderboard fetched data:', payload);

        const normalizedData = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.results)
          ? payload.results
          : [];

        setEntries(normalizedData);
      } catch (fetchError) {
        console.error('Leaderboard fetch error:', fetchError);
        setError('Unable to load leaderboard.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <section>
      <h2 className="mb-4">Leaderboard</h2>
      
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {loading && (
        <div className="loading">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && entries.length === 0 && !error && (
        <div className="card">
          <div className="card-body empty-state">
            <div className="empty-state-icon">🏆</div>
            <p>No leaderboard entries found.</p>
          </div>
        </div>
      )}

      {!loading && entries.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Rankings ({entries.length})</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col" className="text-center" style={{width: '60px'}}>🥇</th>
                  <th scope="col">Username</th>
                  <th scope="col">Score</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={entry.id || entry._id || index}>
                    <td className="text-center">
                      {index === 0 && <span className="badge bg-warning text-dark">1st</span>}
                      {index === 1 && <span className="badge bg-secondary">2nd</span>}
                      {index === 2 && <span className="badge bg-danger">3rd</span>}
                      {index > 2 && <span className="badge bg-secondary">{index + 1}</span>}
                    </td>
                    <td className="fw-semibold">{entry.username || entry.name || 'N/A'}</td>
                    <td><span className="badge bg-primary">{entry.score || entry.points || 0}</span></td>
                    <td><small className="text-muted">{JSON.stringify(entry).substring(0, 50)}...</small></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default Leaderboard;

