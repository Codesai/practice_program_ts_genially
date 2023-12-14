import {Drink} from "./Drink";
import { DrinkMakerDriver } from "./DrinkMakerDriver";
import { Order } from "./Order";

export class CoffeeMachine {
    private orderProcessing: OrderProcessing;
    private readonly priceTable: Record<Drink, number>;
    private readonly drinkMakerDriver: DrinkMakerDriver;

    constructor(priceTable: Record<Drink, number>, drinkMakerDriver: DrinkMakerDriver) {
        this.drinkMakerDriver = drinkMakerDriver;
        this.priceTable = priceTable;
        this.resetOrderProcessing();
    }

    selectCoffee(): void {
        this.orderProcessing.selectDrink(Drink.Coffee);
    }

    selectTea(): void {
        this.orderProcessing.selectDrink(Drink.Tea);
    }

    selectChocolate(): void {
        this.orderProcessing.selectDrink(Drink.Chocolate);
    }

    selectOrangeJuice(): void {
        this.orderProcessing.selectDrink(Drink.OrangeJuice);
    }

    selectExtraHot(): void {
        this.orderProcessing.isExtraHot();
    }

    addOneSpoonOfSugar(): void {
        this.orderProcessing.addOneSpoonOfSugar();
    }

    addMoney(amount: number): void {
        this.orderProcessing.addMoney(amount);
    }

    makeDrink(): void {
        if (!this.orderProcessing.isOrderReady()) {
            this.drinkMakerDriver.notifyUser(this.missingDrinkSelectionMessage());
            return;
        }
        if (!this.orderProcessing.isThereEnoughMoney()) {
            this.drinkMakerDriver.notifyUser(this.missingMoneyMessage());
            return;
        }
        this.drinkMakerDriver.make(this.orderProcessing.createOrder());
        this.resetOrderProcessing();
    }

    private missingDrinkSelectionMessage(): string {
        return "Select a drink, please";
    }

    private missingMoneyMessage(): string {
        const missingMoney = this.orderProcessing.computeMissingMoney();
        return ` not enough money (${(missingMoney.toFixed(1))} missing)`;
    }

    private resetOrderProcessing(): void {
        this.orderProcessing = new OrderProcessing(this.priceTable);
    }
}

class OrderProcessing {
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