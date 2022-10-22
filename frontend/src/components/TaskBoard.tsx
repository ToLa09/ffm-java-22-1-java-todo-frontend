import React from 'react';
import TaskCard from "./TaskCard";
import "../styles/TaskBoard.css";
import {TaskModel} from "../Model/TaskModel";

type TaskBoardProps = {
    taskList: TaskModel[]
    fetchAllTasks: () => void
}



function TaskBoard(props: TaskBoardProps) {

    const filterTodos = (status: 'OPEN' | 'IN_PROGRESS' | 'DONE') => props.taskList
        .filter(task => task.status === status)
        .map(task => {
            return <TaskCard task={task} key={task.id} fetchAllTasks={props.fetchAllTasks}/>
        })

    return (
        <main>
            <div className="column column__todo">
                <h2>Todo</h2>
                {filterTodos("OPEN")}
            </div>
            <div className="column column__inProgress">
                <h2>In progress</h2>
                {filterTodos("IN_PROGRESS")}
            </div>
            <div className="column column__todo">
                <h2>Done</h2>
                {filterTodos("DONE")}
            </div>
        </main>
    )
}

export default TaskBoard;