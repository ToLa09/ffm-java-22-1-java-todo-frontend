import React, {useState} from 'react';
import "../styles/TaskCard.css"
import {TaskModel} from "../model/TaskModel";
import TaskModal from "./TaskModal";
import axios from "axios";
import {AiOutlineArrowRight, AiOutlineArrowLeft} from "react-icons/ai"
import {RiDeleteBin6Line} from "react-icons/ri"


type TaskCardProps = {
    task: TaskModel
    fetchAllTasks: () => void
}

export default function TaskCard(props: TaskCardProps) {
    const [editModal, setEditModal] = useState(false)

    const handleEdit = () => {
        setEditModal(true)
    }

    const handleDelete = () => {
        axios.delete("/api/todo/" + props.task.id)
            .then(() => {
                props.fetchAllTasks()
            })
            .catch(error => {
                console.log("[DELETE ERROR:]" + error)
            })
    }

    const closeModal = () => {
        setEditModal(false)
    }


    function handleAdvance() {
        axios.put("/api/todo/" + props.task.id, {
            id: props.task.id,
            description: props.task.description,
            status: props.task.status === 'OPEN' ? 'IN_PROGRESS' : 'DONE',
        })
            .then(response => {
                props.fetchAllTasks()
            })
            .catch(error => console.log(error))
    }

    function handleBackwards() {
        axios.put("/api/todo/" + props.task.id, {
            id: props.task.id,
            description: props.task.description,
            status: props.task.status === 'DONE' ? 'IN_PROGRESS' : 'OPEN',
        })
            .then(response => {
                props.fetchAllTasks()
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            {editModal && <TaskModal closeModal={closeModal} task={props.task} fetchAllTasks={props.fetchAllTasks}/>}
            <section>
                <div className="taskHeader">
                    <h3>Aufgabe:</h3>
                    <button className="button margin hoverred" onClick={handleDelete}><RiDeleteBin6Line size={18} /></button>
                </div>
                <p className="card__description">{props.task.description}</p>
                <p className="card__status">Status: {props.task.status}</p>
                <div className="cardButtons">
                    {(props.task.status !== "OPEN") &&
                        <button onClick={handleBackwards} className="button margin hoverblue"><AiOutlineArrowLeft size={18}/></button>}
                    <button onClick={handleEdit} className="button margin textsize hoverblue">Edit</button>
                    {(props.task.status !== "DONE") &&
                        <button onClick={handleAdvance} className="button margin hoverblue"> <AiOutlineArrowRight size={18}/> </button>}
                </div>
            </section>

        </>
    )
}