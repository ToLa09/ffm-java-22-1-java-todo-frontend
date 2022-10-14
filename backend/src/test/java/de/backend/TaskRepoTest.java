package de.backend;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class TaskRepoTest {
    TaskRepo taskRepo = new TaskRepo();

    @Test
    void addTestTaskToTaskRepoReturnTask() {
        // GIVEN
        Task task = new Task("1","TestPost", TaskStatus.OPEN);

        //WHEN
        Task actual = taskRepo.addTask(task);
        Task expected = task;

        // THEN
        assertEquals(expected, actual);

    }

    @Test
    void getAllTasksReturnsEmptyList(){
        //GIVEN
        //WHEN
        List<Task> actual = taskRepo.getAllTasks();
        //THEN
        List<Task> expected = new ArrayList<>();
        assertEquals(expected,actual);
    }

    @Test
    void deleteTaskReturnTask(){
        // GIVEN
        Task task = new Task("1","TestPost", TaskStatus.OPEN);

        //WHEN
        Task actual = taskRepo.deleteTask(task);
        Task expected = task;

        // THEN
        assertEquals(expected, actual);
    }

    @Test
    void setTaskUpdatesTask(){
        //GIVEN
        Task oldTask = new Task("1","TestPost", TaskStatus.OPEN);
        Task newTask = new Task("1","Test", TaskStatus.DONE);
        taskRepo.addTask(oldTask);
        //WHEN
        taskRepo.setTask(0,newTask);
        List<Task> actual = taskRepo.getAllTasks();
        //THEN
        List<Task> expected = new ArrayList<>(List.of(newTask));
        assertEquals(expected,actual);
    }

    @Test
    void deleteTaskReturnsEmptyList(){
        //GIVEN
        Task task = new Task("1","TestPost", TaskStatus.OPEN);
        taskRepo.addTask(task);
        //WHEN
        taskRepo.deleteTask(task);
        List<Task> actual = taskRepo.getAllTasks();
        //THEN
        List<Task> expected = new ArrayList<>();
        assertEquals(expected, actual);
    }
}