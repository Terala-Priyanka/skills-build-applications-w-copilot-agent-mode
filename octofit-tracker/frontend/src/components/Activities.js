import { useEffect, useState } from 'react';

const apiBaseUrl = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

const endpoint = `${apiBaseUrl}/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        console.log('Activities endpoint:', endpoint);
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to fetch activities: ${response.status}`);
        }

        const payload = await response.json();
        console.log('Activities fetched data:', payload);

        const normalizedData = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.results)
          ? payload.results
          : [];

        setActivities(normalizedData);
      } catch (fetchError) {
        console.error('Activities fetch error:', fetchError);
        setError('Unable to load activities.');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <section>
      <h2 className="mb-4">Activities</h2>
      
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

      {!loading && activities.length === 0 && !error && (
        <div className="card">
          <div className="card-body empty-state">
            <div className="empty-state-icon">📋</div>
            <p>No activities found.</p>
          </div>
        </div>
      )}

      {!loading && activities.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Activities List ({activities.length})</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={activity.id || activity._id || index}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{activity.name || activity.title || 'N/A'}</td>
                    <td><small className="text-muted">{JSON.stringify(activity).substring(0, 50)}...</small></td>
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

export default Activities;

