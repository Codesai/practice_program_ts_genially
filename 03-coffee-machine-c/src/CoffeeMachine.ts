import {DrinkMaker} from "./DrinkMaker";

enum Drink {
    Coffee,
    Tea,
    Chocolate,
}

export class CoffeeMachine {
    private drinkMaker: DrinkMaker;
    private selectedDrink: Drink;
    private spoonsOfSugars: number;
    private money: number;

    private readonly MAX_SPOONS_OF_SUGAR = 2;

    private readonly PriceTable = {
        [Drink.Coffee]: 0.6,
        [Drink.Tea]: 0.4,
        [Drink.Chocolate]: 0.5
    };

    private readonly RepresentationsByDrink = {
        [Drink.Coffee]: "C",
        [Drink.Tea]: "T",
        [Drink.Chocolate]: "H"
    };

    constructor(drinkMaker: DrinkMaker) {
        this.drinkMaker = drinkMaker;
        this.spoonsOfSugars = 0;
        this.money = 0;
    }

    selectCoffee(): void {
        this.selectedDrink = Drink.Coffee;
    }

    selectTea(): void {
        this.selectedDrink = Drink.Tea;
    }

    selectChocolate(): void {
        this.selectedDrink = Drink.Chocolate;
    }

    addOneSpoonOfSugar(): void {
        // @ts-ignore
        this.spoonsOfSugars = Math.min(
            this.spoonsOfSugars + 1,
            this.MAX_SPOONS_OF_SUGAR
        );
    }

    addMoney(amount: number): void {
        this.money += amount;
    }

    makeDrink(): void {
        if (this.isThereEnoughMoney()) {
            this.drinkMaker.execute(this.composeCommand());
        } else {
            this.drinkMaker.execute(this.composeMissingMoneyMessage());

        }
    }

    private composeMissingMoneyMessage() {
        return `M: not enough money (${(this.computeMissingMoney().toFixed(1))} missing)`;
    }

    private computeMissingMoney() {
        return this.PriceTable[this.selectedDrink] - this.money;
    }

    private isThereEnoughMoney(): boolean {
        return this.money >= this.PriceTable[this.selectedDrink];
    }

    private composeCommand(): string {
        return this.composeSelectedDrinkSection() + this.composeSugarSection();
    }

    private composeSelectedDrinkSection(): string {
        return this.RepresentationsByDrink[this.selectedDrink];
    }

    private composeSugarSection(): string {
        if (this.spoonsOfSugars === 0) {
            return "::";
        }
        return `:${this.spoonsOfSugars}:0`;
    }
}