import { useRef } from "react";
import { useOnClickOutside } from "src/hooks/useOnClickOutside";
import { ITask } from "src/types/ITask";
import styled from "styled-components";

type Props = {
    onClose: () => void;
    task: ITask;
};

const Wrapper = styled.div`
    position: fixed;
    inset: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 100px 0;
`;

const Content = styled.div`
    max-width: 710px;
    margin: 0 auto;
    height: 100%;
    background-color: var(--basic-background);
`;

export function TaskView(props: Props) {
    const ref = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(ref, props.onClose);
    return (
        <Wrapper>
            <Content ref={ref}>TaskView</Content>
        </Wrapper>
    );
}
