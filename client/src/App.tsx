// src/App.tsx
import React from 'react';
import BuildingUsersUseQuery from './components/BuildingUsers-useQuery';
import BuildingUsersUseEffect from './components/BuildingUsers-useEffect';


const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <BuildingUsersUseQuery />
      {<BuildingUsersUseEffect/>}
    </div>
  );
};

export default App;
