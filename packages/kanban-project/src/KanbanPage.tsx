import React from "react";
import styled from "styled-components";
import { Board } from "./components/Board";
import { KanbanHeader } from "./components/KanbanHeader";
import { tasks } from "./mock/mock";

const Container = styled.div`
    padding-top: 32px;
    max-width: 1664px;
    margin: 0 auto;
`;

export const KanbanPage = () => {
    return (
        <Container>
            <KanbanHeader />
            <Board tasks={tasks} />
        </Container>
    );
};

// TODO: variant enum refactor
