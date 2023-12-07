// movie-service.js
import { HttpClient } from 'aurelia-fetch-client';

export class MovieService {
    public fetchUrl = {
        url: 'https://moviesminidatabase.p.rapidapi.com/genres/',
        urlGenre: 'https://moviesminidatabase.p.rapidapi.com/movie/byGen/',
        urlMovie: 'https://moviesminidatabase.p.rapidapi.com/movie/id/',
        options: {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '29e0f92a52msha3ad56560e93a9dp129f72jsnb74e9bcd2f56',
                'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
            }
        }
    }

    getGenre() {
        let httpClient = new HttpClient();
        return httpClient.fetch(this.fetchUrl.url, this.fetchUrl.options)
            .then((res) => res.json());
    }
}
