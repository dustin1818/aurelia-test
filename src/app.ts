import * as toastr from 'toastr';
import { inject } from 'aurelia-framework';
import { TodoService } from './services/todoService';


interface ITodo {
  description: string;
  done: boolean
}

@inject(TodoService)
export class App {
  public message = 'Hello Dustin!';
  public text = "Hello Text"
  private word = "This is a private class"

  // public constructor() {
  //   this.message = this.message + " " + this.text + " " + this.word;
  // }

  doSomething() {
    alert("You clicked the button!");
  }
  public select(value) {
    if (value === 'yes') {
      alert("Selected")
    } else {
      alert("Not Selected")
    }
  }

  public number = 0;

  public incrementNumber() {
    this.number++;
  }

  public decrementNumber() {
    this.number--
  }

  public resetNumber() {
    this.number = 0;
  }

  public age;


  public checkAge(age) {
    age >= 18 ? toastr.success("You are old enough") : toastr.error("You are not old enough");
  }

  // for form 

  heading: string;
  heading2: string;
  todos: ITodo[];
  todoDescription: string
  todoService: TodoService
  public constructor(todoService) {
    this.heading = "Todos";
    this.heading2 = "Save to Local Storage";
    this.todoDescription = '';
    this.todoService = todoService;
  }

  public attached() {
    this.todos = this.todoService.getTasks();
  }


  public addTodo() {
    if (this.todoDescription) {
      this.todos.push({
        description: this.todoDescription,
        done: false
      });
      toastr.success("You have added an item");
      this.todoDescription = '';
      this.saveTasks();
    }
  }

  public remove(todoItem) {
    this.todos = this.todos.filter((todo) => todo.description !== todoItem.description)
    toastr.error("You have removed an item");
    this.saveTasks();
  }

  public edit(todoItem) {
    todoItem.description = prompt('');
    toastr.info("You have edited the item");
    this.saveTasks();
  }

  public saveTasks() {
    this.todoService.saveTasks(this.todos);
  }


}
