import { useEffect, useState } from 'react';

const apiBaseUrl = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

const endpoint = `${apiBaseUrl}/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        console.log('Workouts endpoint:', endpoint);
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to fetch workouts: ${response.status}`);
        }

        const payload = await response.json();
        console.log('Workouts fetched data:', payload);

        const normalizedData = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.results)
          ? payload.results
          : [];

        setWorkouts(normalizedData);
      } catch (fetchError) {
        console.error('Workouts fetch error:', fetchError);
        setError('Unable to load workouts.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section>
      <h2 className="mb-4">Workouts</h2>
      
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

      {!loading && workouts.length === 0 && !error && (
        <div className="card">
          <div className="card-body empty-state">
            <div className="empty-state-icon">💪</div>
            <p>No workouts found.</p>
          </div>
        </div>
      )}

      {!loading && workouts.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Workouts List ({workouts.length})</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Workout Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, index) => (
                  <tr key={workout.id || workout._id || index}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{workout.name || workout.title || 'N/A'}</td>
                    <td><span className="badge bg-secondary">{workout.type || workout.category || 'General'}</span></td>
                    <td><small className="text-muted">{JSON.stringify(workout).substring(0, 50)}...</small></td>
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

export default Workouts;

