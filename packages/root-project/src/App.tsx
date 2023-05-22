import { GantApp } from "@mono-repo/gant-project";
import { GradePage } from "@mono-repo/grade-project";
import { KanbanPage } from "@mono-repo/kanban-project";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { MainPage } from "./pages/main/MainPage";


// const GantWithRouter = withRouter()

function App() {
    return (
        <>
            <Routes>
                <Route path="/kanban" element={<KanbanPage />} />
                <Route path="/grade" element={<GradePage></GradePage>} />
                <Route path="/gant" element={<GantApp></GantApp>} />
                <Route path="/main" element={<MainPage></MainPage>} />
                <Route path="/" element={<Navigate to="/main" />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
}

export default App;
