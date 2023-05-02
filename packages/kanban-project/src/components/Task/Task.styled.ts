import styled from "styled-components";

export const Task = styled.div<{ isDragOver: boolean }>`
    cursor: grab;
    transition: all 0.3s ease 0s;
    :hover {
        box-shadow: 0px 0px 10px rgba(40, 112, 255, 0.3);
    }
`;

export const Wrapper = styled.div<{ isDragOver: boolean }>`
    background-color: #ffffff;
    border-radius: 5px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    pointer-events: ${({ isDragOver }) => (isDragOver ? "none" : "all")};
    gap: 10px;
`;

export const TaskTitle = styled.h3`
    font-size: 18px;
    line-height: 20px;
`;

export const ProjectTitle = styled.p`
    background: #e7efff;
    border-radius: 5px;
    font-size: 16px;
    font-size: 14px;
    display: inline-block;
    line-height: 24px;
    padding: 0 8px;
    color: #2870ff;
`;

export const Tag = styled.p`
    background: #fef2e0;
    border-radius: 5px;
    font-size: 14px;
    line-height: 24px;
    display: inline-block;
    padding: 0 8px;
    color: #ee7900;
`;

export const Name = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    line-height: 16px;
`;

export const Date = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: #313131;
`;

export const Footer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

export const Icons = styled.div`
    display: flex;
    gap: 8px;
    transition: all 0.3s ease 0s;
`;
