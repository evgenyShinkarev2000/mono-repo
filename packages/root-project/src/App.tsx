import { GantPage } from '@mono-repo/gant-project';
import { GradePage } from '@mono-repo/grade-project';
import { CanbanPage } from "@mono-repo/kanban-project";
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { MainPage } from './pages/main/MainPage';

function App()
{
  const [count, setCount] = useState(0)

  return (
    <>
        <Routes>
          <Route path="/kanban" element={<CanbanPage></CanbanPage>} />
          <Route path="/grade" element={<GradePage></GradePage>}/>
          <Route path="/gant" element={<GantPage></GantPage>}/>
          <Route path="/main" element={<MainPage></MainPage>}/>
          <Route path="/" element={<Navigate to="/main"/>}/>
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    </>
  )
}

export default App
