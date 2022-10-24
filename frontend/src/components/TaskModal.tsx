import React, {ChangeEvent, useState} from 'react';
import '../styles/TaskModal.css'
import {TaskModel} from "../model/TaskModel";


type ModalProps = {
    handleClose: () => void
    fetchAllTasks: () => void
    updateTask: (description: string, status: string) => void
    task: TaskModel
}

export default function TaskModal(props: ModalProps) {

    const [taskDescription, setTaskDescription] = useState<string>(props.task.description)
    const [taskStatus, setTaskStatus] = useState<string>(props.task.status)

    function handleNewDescription(event: ChangeEvent<HTMLInputElement>) {
        setTaskDescription(event.target.value)
    }

    function handleNewStatus(event: ChangeEvent<HTMLSelectElement>) {
        setTaskStatus(event.target.value)
    }

    function updateTask() {
        props.updateTask(taskDescription,taskStatus)
        props.fetchAllTasks()
        props.handleClose()
    }

    return (
        <div className='modal'>
            <div className='modal-content'>
                <label>Task Description:</label>
                <input className="inputEdit" type='text' value={taskDescription} onChange={handleNewDescription}/>
                <label htmlFor="statusID">Set Task status:</label>
                <select id="statusID" value={taskStatus} onChange={handleNewStatus} name="">
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                </select>
                <div className="buttons__lower">
                    <button className='button hoverblue' onClick={updateTask}>Update</button>
                    <button className='button hoverred' onClick={props.handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
}