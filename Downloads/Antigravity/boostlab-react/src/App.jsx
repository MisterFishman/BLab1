import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Instruction from './Instruction';
import Tariffs from './Tariffs';
import Layout from './Layout';

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/instruction" element={<Instruction />} />
            <Route path="/tariffs" element={<Tariffs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
