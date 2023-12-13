import {DrinkMaker800} from "./DrinkMaker800";
import {OrderProcessing} from "./OrderProcessing";
import {Model800DrinkMakerDriver} from "./Model800DrinkMakerDriver";
import {Drink} from "./Drink";

export class CoffeeMachine {
    private orderProcessing: OrderProcessing;
    private readonly priceTable: Record<Drink, number>;
    private readonly drinkMakerDriver: Model800DrinkMakerDriver;

    constructor(drinkMaker: DrinkMaker800, priceTable: Record<Drink, number>) {
        this.drinkMakerDriver = new Model800DrinkMakerDriver(drinkMaker);
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