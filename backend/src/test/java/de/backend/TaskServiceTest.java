package de.backend;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

// Für Unit Test testen wir nur die Klasse

// von TaskService aufgerufene Klassen werden gemockt,
// wenn jemand in anderen Klassen arbeitet, kann man testen und es verändert nicht das Ergebnis
class TaskServiceTest {


    TaskRepo taskRepo = mock(TaskRepo.class);
    ServiceUtils serviceUtils = mock(ServiceUtils.class);
    TaskService taskService = new TaskService(serviceUtils, taskRepo);
    // Mocking needs dependency Injection.


    @Test
    void addTestToDoPostToTaskReturnTask() {
        //GIVEN
        when(serviceUtils.generateUUID()).thenReturn("2");

        TaskWithoutId testTaskWithoutId = new TaskWithoutId("TestPost", TaskStatus.OPEN);
        Task testTask = new Task("1", testTaskWithoutId.description(), testTaskWithoutId.status());
        Task expected = testTask;
        when(taskRepo.addTask(testTask)).thenReturn(testTask);
        when(serviceUtils.generateUUID()).thenReturn("1");


        //WHEN
        Task actual = taskService.addTask(testTaskWithoutId);
        //THEN
        verify(serviceUtils).generateUUID();
        assertEquals(expected, actual);
    }

    @Test
    void getAllTasksReturnsEmptyList() {
        //GIVEN
        when(taskRepo.getAllTasks()).thenReturn(new ArrayList<>());
        //WHEN
        List<Task> actual = taskService.getAllTasks();
        //THEN
        List<Task> expected = new ArrayList<>();
        assertEquals(expected, actual);
    }

    @Test
    void getTaskByIdReturnTask(){
        // GIVEN
        String id = "1";
        Task task = new Task("1","TestPost", TaskStatus.OPEN);

        // WHEN
        when(taskRepo.getAllTasks()).thenReturn(new ArrayList<>(List.of(task)));
        Task actual = taskService.getTaskById(id);

        //THEN
        Task expected = task;
        assertEquals(expected, actual);
    }

    @Test
    void deleteTaskByIdReturnTask(){
        //GIVEN
        String id = "1";
        Task task = new Task("1","TestPost", TaskStatus.OPEN);

        when(taskRepo.getAllTasks()).thenReturn(new ArrayList<>(List.of(task)));
        doNothing().when(taskRepo).deleteTask(task);

        //WHEN
        Task actual = taskService.deleteTaskById(id);

        //THEN
        Task expected = task;
        assertEquals(expected, actual);
    }

    @Test
    void updateTaskReturnsUpdatedTask(){
        //GIVEN
        TaskWithoutId task = new TaskWithoutId("TestPost", TaskStatus.OPEN);
        Task oldTask = new Task("1","TestPost", TaskStatus.OPEN);
        Task newTask = new Task("1","Test", TaskStatus.DONE);
        when(serviceUtils.generateUUID()).thenReturn("1");
        when(taskRepo.addTask(oldTask)).thenReturn(oldTask);
        when(taskRepo.getAllTasks()).thenReturn(new ArrayList<>(List.of(oldTask)));
        doNothing().when(taskRepo).setTask(0,newTask);
        taskService.addTask(task);
        //WHEN
        Task actual = taskService.updateTaskById(newTask.id(),newTask);
        //THEN
        Task expected = newTask;
        assertEquals(expected,actual);
    }
}