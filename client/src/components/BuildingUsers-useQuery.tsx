import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  buildingId: number; // Random building ID
}

const fetchUsers = async () => {
  const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
  const users = response.data.map((user) => ({
    ...user,
    buildingId: Math.floor(Math.random() * 3) + 1, // Assign a random building ID (1-5)
  }));
  return users;
};

const BuildingUsers: React.FC = () => {
  const [simulateLoading, setSimulateLoading] = useState(false);
  const [simulateError, setSimulateError] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery<User[], Error>(
    'buildingUsers',
    fetchUsers,
    {
      enabled: !simulateLoading && !simulateError, // Disable query when simulating loading or error
      refetchInterval: 5000
    }
  );

  const handleSimulateLoading = () => {
    setSimulateLoading(true);
    setTimeout(() => {
      setSimulateLoading(false);
    }, 3000);
  };

  const handleSimulateError = () => {
    setSimulateError(true);
    setTimeout(() => {
      setSimulateError(false);
    }, 3000); 
  };

  if (isLoading || simulateLoading) {
    return <div>Loading...</div>;
  }

  if (isError || simulateError) {
    return (
      <div>
        <div>Error: Im simulating an error!</div>
        <button onClick={() => setSimulateError(false)}>Clear Error</button>
      </div>
    );
  }

  const usersByBuilding: { [buildingId: number]: User[] } = {};
  data?.forEach((user) => {
    if (!usersByBuilding[user.buildingId]) {
      usersByBuilding[user.buildingId] = [];
    }
    usersByBuilding[user.buildingId].push(user);
  });

  return (
    <div>
      <h1>useQuery</h1>
      <div>
        <button onClick={handleSimulateLoading}>Simulate Loading</button>
        <button onClick={handleSimulateError}>Simulate Error</button>
      </div>
      {Object.keys(usersByBuilding).map((buildingId) => (
        <div key={buildingId}>
          <h2>Building {buildingId}</h2>
          <ul>
            {usersByBuilding[Number(buildingId)].map((user) => (
              <li key={user.id}>
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BuildingUsers;
