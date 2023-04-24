import React from "react";
import styled from "styled-components";
import { ITask } from "../types/ITask";
import { Column } from "./Column";

type Props = {
    columns: Column[];
};

type Column = {
    title: string;
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
    props.columns.forEach((x) => {
        if (!cols[x.title]) {
            cols[x.title] = [...x.tasks];
        } else {
            cols[x.title].push(...x.tasks);
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
