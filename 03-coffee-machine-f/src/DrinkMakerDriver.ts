import {Order} from "./Order";

export interface DrinkMakerDriver {
    make(order: Order): void;

    notifyUser(message: string): void;
}