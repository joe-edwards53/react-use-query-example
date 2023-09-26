import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  buildingId: number; // Random building ID
}

const BuildingUsersUseEffect: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [simulateLoading, setSimulateLoading] = useState(false);
  const [simulateError, setSimulateError] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
      const usersData = response.data.map((user) => ({
        ...user,
        buildingId: Math.floor(Math.random() * 3) + 1,
      }));
      setUsers(usersData);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

    // Function to toggle the loading state
    const toggleLoading = () => {
        setIsLoading((prevLoading) => !prevLoading);
      };

      useEffect(() => {
        // Set up an interval to toggle loading every 5 seconds
        const intervalId = setInterval(() => {
          toggleLoading();
        }, 3000);
    
        fetchData();
        return () => {
          clearInterval(intervalId);
        };
      }, []);

  const handleSimulateLoading = () => {
    setSimulateLoading(true);
    setTimeout(() => {
      setSimulateLoading(false);
    }, 3000); // Simulate loading for 3 seconds
  };

  const handleSimulateError = () => {
    setSimulateError(true);
    setTimeout(() => {
      setSimulateError(false);
    }, 3000); // Simulate error for 3 seconds
  };

  // Group users by building ID
  const usersByBuilding: { [buildingId: number]: User[] } = {};
  users.forEach((user) => {
    if (!usersByBuilding[user.buildingId]) {
      usersByBuilding[user.buildingId] = [];
    }
    usersByBuilding[user.buildingId].push(user);
  });

  return (
    <div>
              {isLoading || simulateLoading ? (
        <div>Loading...</div>
      ) : isError || simulateError ? (
        <div>
          <div>Error: Failed to fetch data.</div>
          <button onClick={() => setIsError(false)}>Clear Error</button>
        </div>
      ) : (
        <div>
      <h1>useEffect</h1>
      <div>
        <button onClick={handleSimulateLoading}>Simulate Loading</button>
        <button onClick={handleSimulateError}>Simulate Error</button>
      </div>
      <button onClick={fetchData}>Manually Refetch</button>
        <div>
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
        </div>
      )}
    </div>
  );
};

export default BuildingUsersUseEffect;
