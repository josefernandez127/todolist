import { Observable } from "rxjs";

export enum Priority {
    Baja = 1,
    Normal = 2,
    Alta = 3
}

export interface IGroup {
    id: number;
    name: string;
}

export interface ITask {
    id: number;
    name: string;
    created: any;
    done: boolean;
    deleted: boolean;
    dueDate: any;
    groupId: number;
    priority?: Priority
}

export interface ITodoList {
    tasks : ITask[];
    groups: IGroup[];
    selectedTasks: number[];
    filter: {
        title: string;
        date: any;
        groupName: string;
    },
    isToday: boolean;
}