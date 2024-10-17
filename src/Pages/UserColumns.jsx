import React, { useState, useEffect } from 'react';
import { fetchUserColumns } from '../api'; // Adjust the import path as necessary

const UserColumns = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        console.log('Fetching user data...');
        const data = await fetchUserColumns();
        console.log('Fetched data:', data);
        setUsers(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data: ' + err.message);
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <div>Loading user data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!Array.isArray(users) || users.length === 0) return <div>No users found.</div>;

  const columnNames = users.length > 0 ? Object.keys(users[0]) : [];

  return (
    <div>
      <h2>User Data</h2>
      <table>
        <thead>
          <tr>
            {columnNames.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              {columnNames.map((key) => (
                <td key={key}>{user[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserColumns;