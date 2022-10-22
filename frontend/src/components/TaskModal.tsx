import React, {ChangeEvent, useState} from 'react';
import '../styles/TaskModal.css'
import {TaskModel} from "../Model/TaskModel";
import axios from "axios";


type ModalProps = {
    closeModal: () => void
    fetchAllTasks: () => void
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
        axios.put("/api/todo/" + props.task.id, {
            id: props.task.id,
            description: taskDescription,
            status: taskStatus,
        })
            .then(response => {
                props.fetchAllTasks()
                props.closeModal()
                return response.data
            })
            .catch(error => console.log(error))
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
                    <button className='button hoverred' onClick={props.closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    )
}