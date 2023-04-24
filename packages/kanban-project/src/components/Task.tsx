import { PersonIcon } from "src/icons";
import { CalendarIcon } from "src/icons/Calendar";
import { ITask } from "src/types/ITask";
import styled from "styled-components";

type Props = {
    task: ITask;
};

const StyledTask = styled.div`
    background: #ffffff;
    border-radius: 5px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
`;

const TaskTitle = styled.h3`
    font-size: 20px;
    line-height: 20px;
`;

const ProjectTitle = styled.p`
    background: #e7efff;
    border-radius: 5px;
    font-size: 16px;
    display: inline-block;
    padding: 0 4px;
    line-height: 130%;
    color: #2870ff;
`;

const Tag = styled.p`
    background: #fef2e0;
    border-radius: 5px;
    display: inline-block;
    padding: 0 4px;
    line-height: 130%;
    color: #ee7900;
`;

const Name = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 6px;
`;

const Date = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 15px;
    line-height: 130%;
    display: flex;
    align-items: center;
    color: #313131;
`;

export function Task(props: Props): JSX.Element {
    return (
        <StyledTask>
            <TaskTitle>{props.task.title}</TaskTitle>
            <ProjectTitle>{props.task.project}</ProjectTitle>
            <Tag>#{props.task.tag}</Tag>
            <Name>
                <PersonIcon />
                <p>{props.task.executorName}</p>
            </Name>
            <Date>
                <div>
                    <CalendarIcon />
                </div>
                <time>{props.task.deadline.toLocaleDateString("ru")}</time>
            </Date>
        </StyledTask>
    );
}
