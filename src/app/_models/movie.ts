import { ResponseType } from "./response";

export class Movie {
    _title: string;
    _year: string;
    _imdbID: string;
    _type: ResponseType;
    _poster: string;
    _favourite: boolean;

    constructor(
        title: string,
        year: string,
        imdbID: string,
        type: ResponseType,
        poster: string,
        favourite: boolean
    ) {
        this._title = title;
        this._year = year;
        this._imdbID = imdbID;
        this._type = type;
        this._poster = poster;
        this._favourite = favourite;
    }

    get title() {
        return this._title;
    }

    get year() {
        return this._year;
    }

    get imdbID() {
        return this._imdbID;
    }

    get type() {
        return this._type;
    }

    get poster() {
        return this._poster;
    }

    get favourite() {
        return this._favourite;
    }

    public favourites(v) {
        this._favourite = v;
    }
}
