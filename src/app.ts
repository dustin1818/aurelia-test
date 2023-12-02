import * as toastr from 'toastr';
import { inject } from 'aurelia-framework';
import { TodoService } from './services/todoService';
import { HttpClient } from 'aurelia-fetch-client';

interface ITodo {
  description: string;
  done: boolean
}

interface Quotes {
  author: string,
  content: string,
  tags: [],

}

@inject(TodoService)
export class App {
  public message = 'Hello Dustin!';
  public text = "Hello Text"
  private word = "This is a private class"
  QuoteService: any;

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
  quotes: Quotes[];
  quote: string
  author: string
  public constructor(todoService, quoteService) {
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

  public fetchQuote() {
    let httpClient = new HttpClient();
    httpClient.fetch('https://api.quotable.io/quotes/random')
      .then(response => response.json())
      .then(data => {
        this.quote = data[0].content
        this.author = data[0].author
      });
  }




}
