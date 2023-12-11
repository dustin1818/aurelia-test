import { HttpClient } from 'aurelia-fetch-client';

export class BlogService {
    private apiKey = process.env.API_BASE_URL;
    private fetchUrl = 'https://newsapi.org/v2/everything?' +
        'q=Apple&' +
        'from=2023-12-10&' +
        'sortBy=popularity&' +
        `apiKey=${this.apiKey}`

    public async fetchData() {
        const data = await fetch(this.fetchUrl);
        const result = await data.json();
        console.log(result);
        return result;
    }
}