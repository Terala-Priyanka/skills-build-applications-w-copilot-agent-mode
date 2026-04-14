import { useEffect, useState } from 'react';

const apiBaseUrl = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

const endpoint = `${apiBaseUrl}/users/`;

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        console.log('Users endpoint:', endpoint);
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }

        const payload = await response.json();
        console.log('Users fetched data:', payload);

        const normalizedData = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.results)
          ? payload.results
          : [];

        setUsers(normalizedData);
      } catch (fetchError) {
        console.error('Users fetch error:', fetchError);
        setError('Unable to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section>
      <h2 className="mb-4">Users</h2>
      
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

      {!loading && users.length === 0 && !error && (
        <div className="card">
          <div className="card-body empty-state">
            <div className="empty-state-icon">👤</div>
            <p>No users found.</p>
          </div>
        </div>
      )}

      {!loading && users.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Users List ({users.length})</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id || user._id || index}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{user.username || user.name || 'N/A'}</td>
                    <td><a href={`mailto:${user.email}`}>{user.email || 'N/A'}</a></td>
                    <td><small className="text-muted">{JSON.stringify(user).substring(0, 50)}...</small></td>
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

export default Users;

