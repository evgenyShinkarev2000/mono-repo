export type ITask = {
    title: string;
    project: string;
    tag: string;
    executorName: string;
    deadline: Date;
    status: "В работу" | "Выполняются" | "Тестирование" | "Проверка" | "Завершенные";
};
