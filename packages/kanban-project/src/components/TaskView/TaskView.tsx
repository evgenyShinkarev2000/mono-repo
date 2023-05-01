import { useRef } from "react";
import { useOnClickOutside } from "src/hooks/useOnClickOutside";
import { TimerIcon } from "src/ui/icons/Timer";
import { ITask } from "src/types/ITask";
import styled from "styled-components";
import { PointsIcon } from "src/ui/icons/Points";

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
    border-radius: 5px;
    padding: 16px 80px 32px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Title = styled.h3`
    font-weight: 500;
    font-size: 20px;
    color: #000000;
    margin-bottom: 4px;
`;

const BaseTask = styled.p`
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 8px;
    color: #000000;

    span {
        text-decoration: underline;
    }
`;

const Status = styled.p`
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.8);
`;

const Subtitle = styled.h4`
    font-size: 14px;
    line-height: 16px;
    color: #000000;
    margin-bottom: 4px;
`;

const Field = styled.div`
    padding: 8px;
    background: #ffffff;
    border: 1px solid #afbac3;
    border-radius: 5px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: 8px;
    width: 184px;
`;

const Inline = styled.div`
    display: flex;
    gap: 8px;
    justify-content: space-between;
`;

export function TaskView(props: Props) {
    const ref = useRef<HTMLDivElement | null>(null);
    const { task } = props;
    useOnClickOutside(ref, props.onClose);

    return (
        <Wrapper>
            <Content ref={ref}>
                <Title>{task.title}</Title>
                <BaseTask>
                    Базовая задача: <span>Название задачи родителя</span>
                </BaseTask>
                <Status>Статус “{task.status}”</Status>
                <div>
                    <Subtitle>Проект</Subtitle>
                    <Field>
                        <PointsIcon />
                        <p>{task.project}</p>
                    </Field>
                </div>
                <Inline>
                    <div>
                        <Subtitle>Дедлайн</Subtitle>
                        <Field>
                            <TimerIcon />
                            <p>{task.deadline.toLocaleDateString("ru")}</p>
                        </Field>
                    </div>
                    <div>
                        <Subtitle>Тег команды</Subtitle>
                        <Field>
                            <p>{task.tag}</p>
                        </Field>
                    </div>
                    <div>
                        <Subtitle>Планируемые сроки выполнения</Subtitle>
                        <Field style={{ width: "100%" }}>
                            {task.deadline.toLocaleDateString("ru")} - {task.deadline.toLocaleDateString("ru")}
                        </Field>
                    </div>
                </Inline>
            </Content>
        </Wrapper>
    );
}
