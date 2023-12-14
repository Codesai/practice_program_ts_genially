import {DrinkMaker800} from "./DrinkMaker800";
import {Drink} from "../Drink";
import {Order} from "../Order";
import {DrinkMakerDriver} from "../DrinkMakerDriver";

export class Model800DrinkMakerDriver implements DrinkMakerDriver {
    readonly drinkMaker: DrinkMaker800;
    readonly RepresentationsByDrink: Record<Drink, string> = {
        [Drink.Coffee]: "C",
        [Drink.Tea]: "T",
        [Drink.Chocolate]: "H",
        [Drink.OrangeJuice]: "O"
    };

    constructor(drinkMaker: DrinkMaker800) {
        this.drinkMaker = drinkMaker;
    }

    make(order: Order): void {
        const command = this.composeDrinkOrder(order);
        this.drinkMaker.execute(command);
    }

    notifyUser(message: string): void {
        this.drinkMaker.execute("M:" + message);
    }

    private composeDrinkOrder(order: Order): string {
        return this.composeSelectedDrinkSection(order.selectedDrink, order.extraHot) + this.composeSugarSection(order.spoonsOfSugars);
    }

    private composeSelectedDrinkSection(selectedDrink: Drink, extraHot: boolean): string {
        const selectedDrinkSection = this.RepresentationsByDrink[selectedDrink];
        const extraHotSection = extraHot ? "h" : "";
        return selectedDrinkSection + extraHotSection;
    }

    private composeSugarSection(spoonsOfSugars: number): string {
        if (spoonsOfSugars === 0) {
            return "::";
        }
        return `:${spoonsOfSugars}:0`;
    }
}