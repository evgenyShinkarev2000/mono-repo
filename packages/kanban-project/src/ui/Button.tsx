import React from "react";
import styled from "styled-components";

export enum VariantEnum {
    Primary = "primary",
    Secondary = "secondary",
}

type Variant = `${VariantEnum}`;

type Props = {
    text: string;
    variant: Variant;
};

const StyledButton = styled.button<{ variant: Variant }>`
    font-weight: 500;
    font-size: 16px;
    line-height: 32px;
    padding: 0 16px;
    cursor: pointer;
    border-radius: 5px;
    border: 0;

    color: var(--basic-white);
    ${({ variant }) => {
        switch (variant) {
            case VariantEnum.Primary:
                return `
                    background: #004CE3;
                `;
            case VariantEnum.Secondary:
                return `
                    background: var(--basic-grey);
                `;
        }
    }}
`;

export function Button(props: Props): JSX.Element {
    return <StyledButton variant={props.variant}>{props.text}</StyledButton>;
}
