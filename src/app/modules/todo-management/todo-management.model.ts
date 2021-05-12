import { FormGroup } from "@angular/forms";
import { IGroup } from "../core/todo.model";

export interface ITodoManageModel {
    newTaskForm: FormGroup,
    viewMode: boolean;
    addMode: boolean;
    editMode: boolean;
    groups: IGroup[];
}