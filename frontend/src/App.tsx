import React, {useState, useEffect} from 'react';
import Header from "./components/Header";
import TaskBoard from "./components/TaskBoard";
import {TaskModel} from "./model/TaskModel"
import axios from "axios";

function App() {

    const [taskList, setTaskList] = useState<TaskModel[]>([])

    const fetchAllTasks = () => {
        axios.get("/api/todo")
            .then((response) => response.data)
            .catch((error) => {
                console.log('[Error von GET]: =>' + error)
            })
            .then((data) => {
                setTaskList(data)
            })
    }

    useEffect(() => {
        fetchAllTasks()
    }, [])

    return (
        <>
            <Header fetchAllTasks={fetchAllTasks} taskList={taskList}/>
            <TaskBoard taskList={taskList} fetchAllTasks={fetchAllTasks}/>
        </>
    );
}

export default App;
