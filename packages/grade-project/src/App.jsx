import "alertifyjs/build/css/alertify.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/welcomePage/WelcomePage";
import User from "./pages/users/User";
import Team from "./pages/team/Team";
import PrivateRoute from "./routers/PrivateRoute";
import AssessmentPage from "./pages/assessmentPage/AssessmentPage";
import Report from "./pages/report/Report";
import LoginRoute from "./routers/LoginRoute";
import Header from "./Components/Header";
import Stages from "./pages/stages/Stages";
import Project from "./pages/project/Project";
import ProjectInterns from "./pages/projectInterns/ProjectInterns";
import ChangeUser from "./pages/users/ChangeUser";
import { DefaultAppEnv } from "@mono-repo/root-project";
export function App() {

    return (
        <div>
            <Header />
            <Routes>
                {/* <Route path="/" element={<Navigate to={"/login"} replace />} /> */}
                {/* <PrivateRoute path="/main" element={HomePage} /> */}
                <Route
                    path="user/:userId"
                    element={
                        <PrivateRoute>
                            <User />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="project/:projectId"
                    element={
                        <PrivateRoute>
                            <Project />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="projectInerns/:projectId"
                    element={<ProjectInterns />}
                />
                <Route
                    path="team/:teamId"
                    element={
                        <PrivateRoute>
                            <Team />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="login"
                    element={
                        <LoginRoute>
                            <WelcomePage />
                        </LoginRoute>
                    }
                />

                <Route
                    path="change-info"
                    element={
                        <PrivateRoute>
                            <ChangeUser />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="stages/:teamId"
                    element={
                        <PrivateRoute>
                            <Stages />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="form/:teamId"
                    element={
                        <PrivateRoute>
                            <AssessmentPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="report/:userId/:teamId"
                    element={
                        <PrivateRoute>
                            <Report />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to={"login"} replace />} />
            </Routes>
        </div>
    );
}