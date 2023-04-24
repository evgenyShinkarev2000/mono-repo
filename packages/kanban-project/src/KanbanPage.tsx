import React from "react";
import styled from "styled-components";
import { Board } from "./components/Board";
import { KanbanHeader } from "./components/KanbanHeader";
import { columns } from "./mock/mock";

const Container = styled.div`
    padding-top: 32px;
    max-width: 1664px;
    margin: 0 auto;
`;

export const KanbanPage = () => {
    return (
        <Container>
            <KanbanHeader />
            <Board columns={columns} />
        </Container>
    );
};
