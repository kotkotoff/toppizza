import { Pizza } from "./pizza.model";

export class TopList {

  private counts: Map<number, Pizza>;

  constructor() {
    this.counts = new Map<number, Pizza> ();
  }

  static hashCode(s: string): number {
    let h = 0;
    const l = s.length;
    let i = 0;
    if (l > 0) {
      while (i < l) {
        h = (h << 5) - h + s.charCodeAt(i++) | 0;
      }
    }
    return h;
  }

  add(pizza: Pizza): void {
    const hashCode = TopList.hashCode(pizza.toppings.join(''));

    if (this.counts.has(hashCode)) {
      this.counts.get(hashCode).count++;
    } else {
      pizza.count = 1;
      this.counts.set(hashCode, pizza);
    }
  }

  getTop(topN: number): Pizza[] {
    let position = 1;
    return Array.from(this.counts.values()).sort((a, b) =>  b.count - a.count).slice(0, topN).map(p => {
      p.position = position++;
      return p;
    });
  }
}
