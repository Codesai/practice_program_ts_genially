import {DrinkMaker} from "./DrinkMaker";

export enum Drink {
    Coffee,
    Tea,
    Chocolate,
    OrangeJuice
}

export class CoffeeMachine {
    private drinkMaker: DrinkMaker;
    private selectedDrink: Drink;
    private spoonsOfSugars: number;
    private money: number;
    private isExtraHot: boolean;
    private orderStarted: boolean;

    private readonly MAX_SPOONS_OF_SUGAR: number = 2;

    private readonly RepresentationsByDrink: Record<Drink, string> = {
        [Drink.Coffee]: "C",
        [Drink.Tea]: "T",
        [Drink.Chocolate]: "H",
        [Drink.OrangeJuice]: "O"
    };

    private readonly priceTable: Record<Drink, number>;

    constructor(drinkMaker: DrinkMaker, priceTable: Record<Drink, number>) {
        this.drinkMaker = drinkMaker;
        this.priceTable = priceTable;
        this.resetOrder();
    }

    selectCoffee(): void {
        this.selectDrink(Drink.Coffee);
    }

    selectTea(): void {
        this.selectDrink(Drink.Tea);
    }

    selectChocolate(): void {
        this.selectDrink(Drink.Chocolate);
    }

    selectOrangeJuice(): void {
        this.selectDrink(Drink.OrangeJuice);
    }

    selectExtraHot(): void {
        this.isExtraHot = true;
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
       if (this.orderStarted) {
            this.drinkMaker.execute(this.composeCommand());
            this.resetOrder();
        }else{
            this.drinkMaker.execute("M:Select a drink, please");
        }
    }

    private selectDrink(selectedDrink: Drink): void  {
        this.selectedDrink = selectedDrink;
        this.orderStarted = true;
    }

    private resetOrder(): void {
        this.orderStarted = false;
        this.money = 0;
        this.spoonsOfSugars = 0;
        this.isExtraHot = false;
    }

    private composeCommand(): string {
        if (this.isThereEnoughMoney()) {
            return this.composeDrinkOrder();
        }
        return this.composeMissingMoneyMessage();
    }

    private composeMissingMoneyMessage(): string {
        return `M: not enough money (${(this.computeMissingMoney().toFixed(1))} missing)`;
    }

    private computeMissingMoney(): number {
        return this.getSelectedDrinkPrice() - this.money;
    }

    private getSelectedDrinkPrice(): number {
        return this.priceTable[this.selectedDrink];
    }

    private isThereEnoughMoney(): boolean {
        return this.money >= this.getSelectedDrinkPrice();
    }

    private composeDrinkOrder(): string {
        return this.composeSelectedDrinkSection() + this.composeSugarSection();
    }

    private composeSelectedDrinkSection(): string {
        const selectedDrink = this.RepresentationsByDrink[this.selectedDrink];
        const extraHotSection = this.composeExtraHotSection();
        return selectedDrink + extraHotSection;
    }

    private composeExtraHotSection(): string {
        if (this.selectedDrink === Drink.OrangeJuice) {
            return "";
        }
        return this.isExtraHot ? "h" : "";
    }

    private composeSugarSection(): string {
        if (this.spoonsOfSugars === 0) {
            return "::";
        }
        return `:${this.spoonsOfSugars}:0`;
    }
}