import styled, { css } from "styled-components";
import { TextType } from "./Text";

export const Text = styled.div<{ type: TextType }>`
    ${({ type }) => {
        switch (type) {
            case "title-1":
                return css`
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 16px;
                `;
            case "body-1":
                return css`
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 24px;
                `;
        }

        // eslint-disable-next-line
        const exhaustiveChecking: never = type;
    }}
`;
