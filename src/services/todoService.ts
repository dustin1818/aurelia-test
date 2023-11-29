export class TodoService {
    saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    getTasks() {
        const tasksJson = localStorage.getItem('tasks');
        return tasksJson ? JSON.parse(tasksJson) : [];
    }
}