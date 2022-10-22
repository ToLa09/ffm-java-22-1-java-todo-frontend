import React, {ChangeEvent, useState} from 'react';
import "../styles/Header.css"
import {NewTaskModel} from "../model/NewTaskModel";
import axios from "axios";
import {FiSend} from "react-icons/fi"
import {TaskModel} from "../model/TaskModel";

type HeaderProps = {
    fetchAllTasks: () => void
    taskList: TaskModel[]
}

export default function Header(props: HeaderProps) {

    const [newTaskDescription, setNewTaskDescription] = useState("");

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newTask: NewTaskModel = {
            description: newTaskDescription,
            status: 'OPEN'
        }
        axios.post("/api/todo", newTask)
            .then(response => {
                props.fetchAllTasks()
                return response.data
            })
            .catch(error => console.log('[Error post]' + error))
        setNewTaskDescription("")
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskDescription(event.target.value);
    }

    function getNumberOfTasks(status: string) {
        return props.taskList.filter(task => task.status === status)
            .length
    }

    return (
        <header>
            <h1>Geile App 2022</h1>
            <div className={"addContainer"}>
                <form className="headerBorder" onSubmit={handleFormSubmit}>
                    <input className="inputTask"
                            onChange={handleInputChange}
                           value={newTaskDescription}
                           type="text" name="inputTaskDescription" placeholder="Add new task"/>
                    <button className="button hoverblue" type='submit'><FiSend size={18}/></button>
                </form>
                <div className={"headerBorder numberOfTasksContainer"}>
                    <p className={"numberOfTasks"}>Number of Tasks: {props.taskList.length}</p>
                    <div className={"numberOfTasksByCatag"}>
                        <p className={"numberOfTasksFiltered"}>Open: {getNumberOfTasks("OPEN")}</p>
                        <p className={"numberOfTasksFiltered"}>In Progress: {getNumberOfTasks("IN_PROGRESS")}</p>
                        <p className={"numberOfTasksFiltered"}>Done: {getNumberOfTasks("DONE")}</p>
                    </div>
                </div>
            </div>
        </header>
    );
}