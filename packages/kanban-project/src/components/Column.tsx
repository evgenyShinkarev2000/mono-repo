import { ITask } from "src/types/ITask";
import React from "react";
import styled from "styled-components";
import { Task } from "./Task";

type ColumnProps = {
    title: string;
    tasks: ITask[];
};

const Header = styled.div`
    padding: 20px;
    border-radius: 5px;
    font-size: 20px;
    line-height: 23px;
    text-transform: uppercase;
    color: #ffffff;
    margin-bottom: 32px;
`;

const StyledColumn = styled.div`
    :nth-child(1) ${Header} {
        background: #b1b7ba;
    }

    :nth-child(2) ${Header} {
        background: #eb5757;
    }

    :nth-child(3) ${Header} {
        background: #3fa2f7;
    }

    :nth-child(4) ${Header} {
        background: #ffc400;
    }

    :nth-child(5) ${Header} {
        background: #56c568;
    }
`;

const Tasks = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export function Column(props: ColumnProps): JSX.Element {
    return (
        <StyledColumn>
            <Header>{props.title}</Header>
            <Tasks>
                {props.tasks.map((task) => (
                    <Task key={task.title} task={task} />
                ))}
            </Tasks>
        </StyledColumn>
    );
}
