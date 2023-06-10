import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { store } from "../../shared/src";
import { AppEnvProvider } from "./AppEnv/AppEnvProvider";
import { DefaultAppEnv } from "./AppEnv/DefaultAppEnv";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <Provider store={store}>
            <AppEnvProvider appEnv={DefaultAppEnv}>
                <App />
            </AppEnvProvider>
        </Provider>
    </BrowserRouter>
);
