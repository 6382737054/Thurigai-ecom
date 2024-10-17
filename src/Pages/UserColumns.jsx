import React, { useState, useEffect } from 'react';
import { fetchUserColumns } from '../api'; // Adjust the import path as necessary

const UserColumns = () => {
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        console.log('Fetching user data...');
        const data = await fetchUserColumns();
        console.log('Fetched data:', data);
        setTableData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data: ' + err.message);
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading user data...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  if (!tableData || !tableData.tableStructure || tableData.userData.length === 0) {
    return <div className="text-center mt-8">No user data available.</div>;
  }

  const { tableStructure, userData } = tableData;

  return (
    <div className="container mx-auto mt-8 p-4 pt-36">
      <h2 className="text-2xl font-bold mb-4">User Data</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {tableStructure.map((column) => (
              <th key={column.Field} className="px-4 py-2 text-left">{column.Field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
              {Object.values(user).map((value, cellIndex) => (
                <td key={`${index}-${cellIndex}`} className="border px-4 py-2">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserColumns;