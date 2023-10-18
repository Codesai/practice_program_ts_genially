import {DrinkMaker} from "./DrinkMaker";

export class CoffeeMachine {
    private drinkMaker: DrinkMaker;
    private selectedDrink: string;
    private spoonsOfSugars: number;
    private readonly MAX_SPOONS_OF_SUGAR = 2;

    constructor(drinkMaker: DrinkMaker) {
        this.drinkMaker = drinkMaker;
        this.spoonsOfSugars = 0;
    }

    selectCoffee(): void {
        this.selectedDrink = "C";
    }

    selectTea(): void {
        this.selectedDrink = "T";
    }

    selectChocolate(): void {
        this.selectedDrink = "H";
    }

    addOneSpoonOfSugar(): void {
        this.spoonsOfSugars = Math.min(this.spoonsOfSugars + 1, this.MAX_SPOONS_OF_SUGAR);
    }

    makeDrink(): void {
        this.drinkMaker.execute(this.composeCommand());
    }

    private composeCommand(): string {
        return this.composeSelectedDrinkSection() + this.composeSugarSection();
    }

    private composeSelectedDrinkSection() {
        return `${this.selectedDrink}`;
    }

    private composeSugarSection() {
        if(this.spoonsOfSugars === 0) {
            return "::";
        }
        return `:${this.spoonsOfSugars}:0`;
    }
}
