export class Pizza {

  count = 1;
  position: number;
  toppings: string[];

  constructor(toppings: string[]) {
    this.toppings = toppings.sort();
  }
}
