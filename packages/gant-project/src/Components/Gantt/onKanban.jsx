import { DefaultAppEnv } from "@mono-repo/root-project";
import axios from "axios";

export function onKanbanViewChange(taskId, isOnKanban) {

    axios.post(`${DefaultAppEnv.gantApiUri}/v1/gant/task/${taskId}/kanban_view`, { is_on_kanban: isOnKanban })
        .then(response => {
            console.log(response.data);
            window.location.reload()
        })
        .catch(error => {
            console.error(error);
        });
}