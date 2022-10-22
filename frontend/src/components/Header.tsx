import React, {ChangeEvent, useState} from 'react';
import "../styles/Header.css"
import {NewTaskModel} from "../Model/NewTaskModel";
import axios from "axios";
import {FiSend} from "react-icons/fi"

type HeaderProps = {
    fetchAllTasks: () => void
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

    return (
        <header>
            <h1>Geile App 2022</h1>
            <form onSubmit={handleFormSubmit}>
                <input className="inputTask"
                        onChange={handleInputChange}
                       value={newTaskDescription}
                       type="text" name="inputTaskDescription" placeholder="Add new task"/>
                <button className="button hoverblue" type='submit'><FiSend size={18}/></button>
            </form>
        </header>
    );
}