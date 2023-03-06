import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import { CanbanPage } from "@mono-repo/kanban-project";

function App()
{
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>it's main page</h2>
        <Routes>
          <Route path="/kanban" element={<CanbanPage></CanbanPage>} />
          <Route path="/grade" />
        </Routes>
    </>
  )
}

export default App
