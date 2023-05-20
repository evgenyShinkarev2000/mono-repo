import styled from "styled-components";

const SelectText = styled.div`
    color: #565656;
`;

const SelectedCreteTask = styled.div`
    color: #565656;
`;

const Value = styled.div`
    padding: 8px 16px;
    cursor: pointer;
    color: #565656;
    transition: all 0.3s ease 0s;

    :hover {
        background: var(--primary-blue-0);
    }
`;

export const DropdownConverter = {
    Selected: {
        Header: SelectText,
        CreateTask: SelectedCreteTask,
    },
    Data: {
        Header: Value,
        CreateTask: Value,
    },
};
