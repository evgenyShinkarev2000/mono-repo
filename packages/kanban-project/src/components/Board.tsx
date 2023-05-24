import { BaseStatuses, Status } from "@kanban/data/Status";
import { TaskShort } from "@kanban/data/TaskShort";
import { useRef } from "react";
import styled from "styled-components";
import { Column } from "./Column/Column";

type Props = {
    tasks: TaskShort[];
    onStatusChange: (task: TaskShort, statusId: number) => void;
    onModalOpen: (taskId: number) => void;
};

const Columns = styled.div`
    display: flex;
    gap: 16px;
    > * {
        flex-basis: 20%;
    }
`;

const statuses: Status[] = Object.values(BaseStatuses);

export function Board(props: Props) {
    const draggedTaskRef = useRef<TaskShort>();

    function onDrop(e: React.DragEvent<HTMLDivElement>, colIndex: number, itemIndex: number, status: Status) {
        if(draggedTaskRef.current?.status.id !== status.id){
            props.onStatusChange(draggedTaskRef.current!, status.id);
        }
        
        e.preventDefault();
    }

    function onDragStart(task: TaskShort) {
        draggedTaskRef.current = task;
    }

    function onEmptyColumnDrop(colIndex: number, statusId: number) {
        if(draggedTaskRef.current?.status.id !== statusId){
            props.onStatusChange(draggedTaskRef.current!, statusId);
        }
    }

    return (
        <Columns>
            {statuses.map((status, colIndex) => (
                <Column
                    key={status.id}
                    status={status}
                    tasks={props.tasks.filter(t => t.status.id === status.id)}
                    onDrop={(e, itemIndex) => onDrop(e, colIndex, itemIndex, status)}
                    onDragStart={(e, taskIndex, task) => onDragStart(task)}
                    onEmptyColumnDrop={(statusId) => onEmptyColumnDrop(colIndex, statusId)}
                    onModalOpen={props.onModalOpen}
                />
            ))}
        </Columns>
    );
}
