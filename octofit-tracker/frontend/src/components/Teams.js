import { useEffect, useState } from 'react';

const apiBaseUrl = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

const endpoint = `${apiBaseUrl}/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        console.log('Teams endpoint:', endpoint);
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to fetch teams: ${response.status}`);
        }

        const payload = await response.json();
        console.log('Teams fetched data:', payload);

        const normalizedData = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.results)
          ? payload.results
          : [];

        setTeams(normalizedData);
      } catch (fetchError) {
        console.error('Teams fetch error:', fetchError);
        setError('Unable to load teams.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <section>
      <h2 className="mb-4">Teams</h2>
      
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

      {!loading && teams.length === 0 && !error && (
        <div className="card">
          <div className="card-body empty-state">
            <div className="empty-state-icon">👥</div>
            <p>No teams found.</p>
          </div>
        </div>
      )}

      {!loading && teams.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Teams List ({teams.length})</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Team Name</th>
                  <th scope="col">Members</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr key={team.id || team._id || index}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{team.name || team.team_name || 'N/A'}</td>
                    <td><span className="badge bg-info">{team.member_count || team.members?.length || 0}</span></td>
                    <td><small className="text-muted">{JSON.stringify(team).substring(0, 50)}...</small></td>
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

export default Teams;

