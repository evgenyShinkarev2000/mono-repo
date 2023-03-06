import React from "react";
import { NavLink, Routes } from "react-router-dom";

export const MainPage = () => {
  return (
    <>
    <h2>It's main page</h2>
    <nav>
      <NavLink to="/kanban">Kanban</NavLink>
      <NavLink to="/grade">Grade</NavLink>
      <NavLink to="/gant">Gant</NavLink>
    </nav>
    </>
  )
}