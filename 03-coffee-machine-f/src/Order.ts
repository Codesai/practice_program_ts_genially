import {Drink} from "./Drink";

export class Order {

    readonly selectedDrink: Drink;
    readonly extraHot: boolean;
    readonly spoonsOfSugars: number;

    constructor(selectedDrink: Drink, extraHot: boolean, spoonsOfSugars: number) {
        this.selectedDrink = selectedDrink;
        this.extraHot = extraHot;
        this.spoonsOfSugars = spoonsOfSugars;
    }
}