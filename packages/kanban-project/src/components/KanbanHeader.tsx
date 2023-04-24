import React from "react";
import styled from "styled-components";
import { Button } from "../ui/Button";
import { Select } from "../ui/Select";

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
`;
const Selects = styled.div`
    display: flex;
    gap: 16px;
`;

export function KanbanHeader(): JSX.Element {
    return (
        <StyledHeader>
            <Selects>
                <Select placeholder="Select" values={["1", "2"]} />
                <Select placeholder="Select" values={["3", "4"]} />
            </Selects>
            <Button text="Удалить завершенные задачи" variant="primary" />
        </StyledHeader>
    );
}
