import { film } from "./film/film.service";

export class services {
  constructor() {
    this.film = new film()
  }
}
