import styled from "styled-components";

export const Main = styled.div`
    position: relative;
    width: 248px;
`;

export const Placeholder = styled.div`
    color: var(--basic-grey);
`;

export const SelectText = styled.div`
    color: #565656;
`;

export const Values = styled.div<{ height: number }>`
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    background-color: #ffffff;

    border: 1px solid var(--basic-grey);
    border-radius: 5px;
    transform: translateY(-100%);
    opacity: 0;
    height: ${({ height }) => height}%;
    overflow: hidden;
    transition: all 0.3s ease 0s;

    &.enter-active {
        opacity: 1;
        transform: translateY(0%);
    }

    &.enter-done {
        opacity: 1;
        transform: translateY(0%);
    }

    &.exit-active {
        height: 0%;
    }

    &.exit-done {
        height: 0%;
    }
`;

export const Value = styled.div`
    padding: 8px 16px;
    cursor: pointer;
    color: #565656;

    :not(:last-child) {
        border-bottom: 1px solid var(--basic-grey);
    }
`;

export const StyledSelect = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 8px 16px;
    position: relative;
    z-index: 1;

    background-color: #ffffff;

    border: 1px solid var(--basic-grey);
    border-radius: 5px;
`;
