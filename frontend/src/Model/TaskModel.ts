import {TaskStatus} from "./TaskStatus";

export type TaskModel = {
    id: string
    description: string
    status:TaskStatus
}