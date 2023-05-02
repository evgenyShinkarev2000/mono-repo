import { useRef } from "react";
import { useOnClickOutside } from "@kanban/hooks/useOnClickOutside";
import { TimerIcon } from "@kanban/ui/icons/Timer";
import { ITask } from "@kanban/types/ITask";
import { PointsIcon } from "@kanban/ui/icons/Points";
import * as S from "./TaskView.styled";

type Props = {
    onClose: () => void;
    task: ITask;
};

export function TaskView(props: Props) {
    const ref = useRef<HTMLDivElement | null>(null);
    const { task } = props;
    useOnClickOutside(ref, props.onClose);

    return (
        <S.Wrapper>
            <S.Content ref={ref}>
                <div>
                    <S.Title>{task.title}</S.Title>
                    <S.BaseTask>
                        Базовая задача: <span>Название задачи родителя</span>
                    </S.BaseTask>
                    <S.Status>Статус “{task.status}”</S.Status>
                </div>
                <div>
                    <S.Subtitle>Проект</S.Subtitle>
                    <S.Field>
                        <PointsIcon />
                        <p>{task.project}</p>
                    </S.Field>
                </div>
                <S.Inline>
                    <div>
                        <S.Subtitle>Дедлайн</S.Subtitle>
                        <S.Field>
                            <TimerIcon />
                            <p>{task.deadline.toLocaleDateString("ru")}</p>
                        </S.Field>
                    </div>
                    <div>
                        <S.Subtitle>Тег команды</S.Subtitle>
                        <S.Field>
                            <p>{task.tag}</p>
                        </S.Field>
                    </div>
                    <div>
                        <S.Subtitle>Планируемые сроки выполнения</S.Subtitle>
                        <S.Field style={{ width: "100%" }}>
                            {task.deadline.toLocaleDateString("ru")} - {task.deadline.toLocaleDateString("ru")}
                        </S.Field>
                    </div>
                </S.Inline>
            </S.Content>
        </S.Wrapper>
    );
}
