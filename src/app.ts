import toastr from 'toastr';
import { inject } from 'aurelia-framework';
import { TodoService } from './services/todoService';
import { HttpClient } from 'aurelia-fetch-client';
import { MovieService } from 'services/movieService';
import { PasswordService } from 'services/passwordService';

interface ITodo {
  description: string;
  done: boolean
}

interface Quotes {
  author: string,
  content: string,
  tags: [],
}

interface Movie {
  image_url: string,
  title: string,
  trailer: string,
  type: string,
  description: string
}

@inject(TodoService, MovieService, PasswordService)

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
    age >= 18 ? toastr.success("You are old enough!") : toastr.error("You are not old enough");
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
  inputNumber: string
  results: [];
  movieService: MovieService;
  index: number;
  movieInterface: Movie
  movieAvailable: boolean
  passwordService: PasswordService
  public constructor(todoService, movieService, passwordService) {
    this.heading = "Todos";
    this.heading2 = "Save to Local Storage";
    this.todoDescription = '';
    this.todoService = todoService;
    this.movieService = movieService;
    this.results = []
    this.index = 1
    this.passwordService = passwordService;
  }

  public attached() {
    this.todos = this.todoService.getTasks();
  }

  public activate() {
    return this.movieService.getGenre().then((data) => {
      this.results = data.results;
    })
      .catch((error) => toastr.error('Error fetching genres:', error));
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
    if (this.inputNumber.toString() == randomNum.toString()) {
      toastr.success(`Your guess is: ${this.inputNumber}, it's  correct!`)
      this.inputNumber = '';
    } else {
      toastr.error(`Your guess is: ${this.inputNumber}, it's  incorrect should be ${randomNum}!`)
      this.inputNumber = '';
    }
  }

  public async btnGenre(index) {
    const url = this.movieService.fetchUrl.urlGenre + `${index.genre}/`;
    const options = this.movieService.fetchUrl.options;
    //get genres and length
    const genreResult = await this.movieService.fetchData(url, options);
    const totalMovieLength = genreResult.results.length
    this.movieAvailable = totalMovieLength !== undefined && totalMovieLength !== null;
    const randomMovie = genreResult.results[Math.floor(Math.random() * totalMovieLength)]
    if (randomMovie === undefined) {
      toastr.info('No movie at this category 😥');
    }
    //get movie
    const urlMovie = this.movieService.fetchUrl.urlMovie + `${randomMovie.imdb_id}/`
    const movieResult = await this.movieService.fetchData(urlMovie, options);
    this.movieInterface = movieResult.results;
  }

  // FUNCTION WAY TO CHECK THE TYPESCRIPT ELEMENT OF THE HTML
  // isInputElement(element: HTMLElement): element is HTMLButtonElement {
  //   return element.tagName === 'BUTTON';
  // }

  // checkPassword() {
  //   const inputElement = document.getElementById('btn');
  //   if (this.isInputElement(inputElement)) {
  //     console.log(inputElement);
  //   } else {
  //     console.error('Element is not of type HTMLInputElement');
  //   }
  // }

  public isOn = false; // Removed separate isOn2 variable

  private seePass(id: string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    this.isOn = !this.isOn;
    inputElement.type = this.isOn ? "text" : "password";
  }

  public passVariables = {
    pass: '',
    pass2: ''
  };

  public checkPassword() {
    this.passwordService.checkPassword(this.passVariables.pass, this.passVariables.pass2);
  }

}
