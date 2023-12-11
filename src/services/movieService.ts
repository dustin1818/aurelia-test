// movie-service.js
import { HttpClient } from 'aurelia-fetch-client';
import * as toastr from 'toastr';

export class MovieService {
    private apiKey = process.env.API_KEY;
    public fetchUrl = {
        url: 'https://moviesminidatabase.p.rapidapi.com/genres/',
        urlGenre: 'https://moviesminidatabase.p.rapidapi.com/movie/byGen/',
        urlMovie: 'https://moviesminidatabase.p.rapidapi.com/movie/id/',
        options: {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': this.apiKey,
                'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
            }
        }
    }

    public getGenre() {
        let httpClient = new HttpClient();
        return httpClient.fetch(this.fetchUrl.url, this.fetchUrl.options)
            .then((res) => res.json());
    }

    public fetchData(url, options) {
        try {
            let httpClient = new HttpClient();
            return httpClient.fetch(url, options)
                .then((res) => res.json());
        } catch (error) {
            toastr.error(error);
            throw error; // Re-throw the error to propagate it up the call stack
        }
    }
}
