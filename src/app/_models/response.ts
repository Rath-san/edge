export interface ResponseSearch {
    Search: ResponseMovie[];
    totalResults: number;
    Response: string;
    Error?: string;
}

export interface ResponseMovie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: ResponseType;
    Poster: string;
}

export interface ResponseMovieByID {
    Actors: string;
    Awards: string;
    Country: string;
    Director: string;
    Genre: string
    Language: string;
    Metascore: string;
    Plot: string;
    Poster: string;
    Rated: string;
    Ratings: ResponseRatings[]
    Released: string;
    Response: string;
    Runtime: string;
    Title: string;
    Type: ResponseType;
    Writer: string;
    Year: string;
    imdbID: string;
    imdbRating: string;
    imdbVotes: string;
    totalSeasons: string;
}
export interface ResponseRatings {
    Source: string;
    Value: string;
}

export enum ResponseType {
    Game = 'game',
    Movie = 'movie',
    Series = 'series',
}
