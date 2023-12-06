import * as toastr from 'toastr';
import { inject } from 'aurelia-framework';
import { TodoService } from './services/todoService';
import { HttpClient } from 'aurelia-fetch-client';
import { MovieService } from 'services/movieService';

interface ITodo {
  description: string;
  done: boolean
}

interface Quotes {
  author: string,
  content: string,
  tags: [],
}

interface IGenre {
  genre: string
}

@inject(TodoService, MovieService)

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
  quotes: Quotes[];
  quote: string
  author: string
  inputNumber: number
  results: [];
  movieService: MovieService;
  index: number;
  public constructor(todoService, movieService) {
    this.heading = "Todos";
    this.heading2 = "Save to Local Storage";
    this.todoDescription = '';
    this.todoService = todoService;
    this.movieService = movieService;
    this.results = []
    this.index = 1
  }

  public attached() {
    this.todos = this.todoService.getTasks();
  }

  public activate() {
    return this.movieService.getGenre().then((data) => {
      this.results = data.results;
    })
      .catch((error) => console.error('Error fetching genres:', error));
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

  public submitGuess() {
    const randomNum = Math.floor((Math.random() * 10 + 1));
    if (this.inputNumber == randomNum) {
      toastr.success(`Your guess is: ${this.inputNumber}, it's  correct!`)
    } else {
      toastr.error(`Your guess is: ${this.inputNumber}, it's  incorrect should be ${randomNum}!`)
    }
  }

  public async btnGenre(index) {
    console.log(index)
    const url = this.movieService.fetchUrl.urlGenre + `${index.genre}/`;
    const options = this.movieService.fetchUrl.options;
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}
