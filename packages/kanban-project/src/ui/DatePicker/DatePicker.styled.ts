import styled, { css } from "styled-components";

export const Date = styled.div`
    position: relative;
    display: inline-flex;
`;

export const Subtitle = styled.h4`
    font-size: 14px;
    line-height: 16px;
    color: #000000;
    margin-bottom: 4px;
`;

export const Field = styled.div`
    padding: 8px;
    background: #ffffff;
    border: 1px solid #afbac3;
    border-radius: 5px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: 8px;
    width: 184px;
    user-select: none;
    cursor: pointer;
`;

export const MonthPicker = styled.div`
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Dropdown = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    padding: 8px 16px;
    background-color: var(--basic-white);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    width: 267px;
    height: 257px;
    user-select: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const DropdownDate = styled.div`
    font-weight: 400;
    font-size: 14px;
    line-height: 32px;
`;

export const Calendar = styled.div`
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(7, auto);
    grid-template-rows: repeat(5, auto);
`;

export const HeadCell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: var(--basic-dark-grey);
`;

export const Cell = styled.div<{ disabled?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: all 0.3s ease 0s;
    color: var(--basic-inactive);

    ${({ disabled }) => {
        if (!disabled)
            return css`
                color: var(--basic-dark-grey);
                cursor: pointer;

                &:hover {
                    background-color: var(--primary-blue-1);
                }
            `;
    }}
`;