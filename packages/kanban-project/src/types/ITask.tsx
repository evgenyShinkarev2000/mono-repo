export type ITask = {
    title: string;
    project: string;
    tag: string;
    executorName: string;
    deadline: Date;
    status: ITaskStatus;
};

export type ITaskStatus = "В работу" | "Выполняются" | "Тестирование" | "Проверка" | "Завершенные";
