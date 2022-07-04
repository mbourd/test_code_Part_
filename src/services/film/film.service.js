import { movies$ } from "./movies";

export class film {
  getAll() {
    return movies$;
  }

  async getAllByCategory(category) {
    let all;

    if (category === "all") {
      return this.getAll();
    } else {
      await this.getAll().then((r) => {
        all = r.filter(v => v.category === category);
      });
    }

    return new Promise((res, eject) => setTimeout(res, 100, all));
  }

  async getAllCategory() {
    let all = [];

    await this.getAll().then((r) => {
      r.forEach(element => {
        all.push(element.category);
      });

      all = [...new Set(all)]
    });

    return new Promise((res, eject) => setTimeout(res, 100, all));
  }
}
