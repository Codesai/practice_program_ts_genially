import {Drink} from "./Drink";
import {Order} from "./Order";

export class OrderProcessing {
    private readonly MAX_SPOONS_OF_SUGAR: number = 2;
    private selectedDrink: Drink;
    private extraHot: boolean;
    private spoonsOfSugars: number;
    private money: number;
    private readonly priceTable: Record<Drink, number>;

    constructor(priceTable: Record<Drink, number>) {
        this.priceTable = priceTable;
        this.money = 0;
        this.spoonsOfSugars = 0;
        this.extraHot = false;
    }

    isOrderReady(): boolean {
        return this.selectedDrink !== undefined;
    }

    selectDrink(selectedDrink: Drink): void {
        this.selectedDrink = selectedDrink;
    }

    isExtraHot(): void {
        if (this.selectedDrink === Drink.OrangeJuice) {
            return;
        }
        this.extraHot = true;
    }

    addOneSpoonOfSugar(): void {
        this.spoonsOfSugars = Math.min(
            this.spoonsOfSugars + 1,
            this.MAX_SPOONS_OF_SUGAR
        );
    }

    createOrder(): Order {
        return new Order(this.selectedDrink, this.extraHot, this.spoonsOfSugars);
    }

    addMoney(amount: number): void {
        this.money += amount;
    }

    computeMissingMoney(): number {
        return this.getSelectedDrinkPrice() - this.money;
    }

    isThereEnoughMoney(): boolean {
        return this.money >=  this.getSelectedDrinkPrice();
    }

    private getSelectedDrinkPrice(): number {
        return this.priceTable[this.selectedDrink];
    }
}