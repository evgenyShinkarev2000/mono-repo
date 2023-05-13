import styled from "styled-components";

export const Wrapper = styled.div`
    position: fixed;
    inset: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 100px 0;
`;

export const Content = styled.div`
    max-width: 710px;
    margin: 0 auto;
    height: 100%;
    background-color: var(--basic-background);
    border-radius: 5px;
    padding: 16px 80px 32px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow: auto;
`;

export const Title = styled.h3`
    font-weight: 500;
    font-size: 20px;
    line-height: 20px;
    padding: 8px 0;
    color: #000000;
    margin-bottom: 4px;
`;

export const BaseTask = styled.p`
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 8px;
    color: #000000;

    span {
        text-decoration: underline;
    }
`;

export const Status = styled.p`
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.8);
`;

export const Subtitle = styled.h4`
    font-size: 14px;
    line-height: 16px;
    color: #000000;
    margin-bottom: 4px;
`;

export const Field = styled.div`
    padding: 0 8px;
    background: #ffffff;
    border: 1px solid #afbac3;
    border-radius: 5px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: 8px;
    width: 184px;
`;

export const Inline = styled.div`
    display: flex;
    gap: 8px;
    justify-content: space-between;
`;
