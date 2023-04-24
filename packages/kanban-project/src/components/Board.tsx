import React from "react";
import styled from "styled-components";
import { ITask } from "../types/ITask";
import { Column } from "./Column";

type Props = {
    tasks: ITask[];
};

const Columns = styled.div`
    display: flex;
    gap: 16px;
    > * {
        flex-basis: 20%;
    }
`;

export function Board(props: Props) {
    const cols: Record<string, ITask[]> = {};
    props.tasks.forEach((task) => {
        if (!cols[task.status]) {
            cols[task.status] = [task];
        } else {
            cols[task.status].push(task);
        }
    });
    return (
        <Columns>
            {Object.keys(cols).map((colTitle) => (
                <Column key={colTitle} title={colTitle} tasks={cols[colTitle]} />
            ))}
        </Columns>
    );
}
