import { useRef } from "react";
import { useOnClickOutside } from "@kanban/hooks/useOnClickOutside";
import { TimerIcon } from "@kanban/ui/icons/Timer";
import { ITask } from "@kanban/types/ITask";
import { PointsIcon } from "@kanban/ui/icons/Points";
import * as S from "./TaskView.styled";
import { DateView } from "@kanban/ui/DatePicker/DateView";
import { BookmarkIcon, CalendarIcon, PlusInsideBoxIcon } from "@kanban/ui/icons";
import { DateRange } from "@kanban/ui/DatePicker/DateRange";
import { TextArea } from "@kanban/ui/TextArea";
import { Text } from "@kanban/ui/Text";
import { CheckboxGroup } from "@kanban/ui/Сheckbox/CheckboxGroup";
import { Checkbox } from "@kanban/ui/Сheckbox";

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
                        <p>Название проекта</p>
                    </S.Field>
                </div>
                <S.Inline>
                    <DateView label="Дедлайн" value={new Date()} icon={<TimerIcon />} />
                    <div>
                        <S.Subtitle>Тег команды</S.Subtitle>
                        <S.Field>
                            <BookmarkIcon />
                            <Text type="body-1" style={{ lineHeight: "32px" }}>
                                {task.tag}
                            </Text>
                        </S.Field>
                    </div>
                    <div>
                        <DateRange
                            label="Планируемые сроки выполнения"
                            from={new Date()}
                            to={new Date()}
                            icon={<CalendarIcon />}
                        />
                    </div>
                </S.Inline>
                <TextArea
                    onChange={() => {}}
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
                />
                <div style={{ display: "flex", gap: 8 }}>
                    <div>
                        <Text type="title-1" indent={2}>
                            Постановщик
                        </Text>
                        <Text type="body-1">Иван Иванович Иванов</Text>
                    </div>
                    <div>
                        <Text type="title-1" indent={2}>
                            Ответственный
                        </Text>
                        <S.Field>
                            <Text type="body-1">Иван Иванович Иванов</Text>
                        </S.Field>
                    </div>
                </div>
                <div>
                    <Text type="title-1" indent={2}>
                        <div style={{ display: "flex", gap: 8 }}>
                            <p>Исполнители</p>
                            <PlusInsideBoxIcon />
                        </div>
                    </Text>
                    <Text type="body-1">Иван Иванович Иванов</Text>
                    <Text type="body-1">Иван Иванович Иванов</Text>
                </div>
                <div>
                    <Text type="title-1" indent={2}>
                        <div style={{ display: "flex", gap: 8 }}>
                            <p>Чек лист</p>
                            <PlusInsideBoxIcon />
                        </div>
                    </Text>
                    <CheckboxGroup onChange={console.log}>
                        <Checkbox value="1 пункт" label="1 пункт" />
                        <Checkbox value="2 пункт" label="2 пункт" />
                        <Checkbox value="3 пункт" label="3 пункт" />
                        <Checkbox value="4 пункт" label="4 пункт" />
                    </CheckboxGroup>
                </div>
            </S.Content>
        </S.Wrapper>
    );
}
