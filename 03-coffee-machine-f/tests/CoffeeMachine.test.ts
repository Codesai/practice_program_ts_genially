import {anyString, capture, instance, mock, verify} from "ts-mockito";
import {CoffeeMachine} from "../src/CoffeeMachine";
import { Drink } from "../src/Drink";
import { DrinkMaker800 } from "../src/DrinkMaker800";

describe('Coffee Machine', () => {
    let drinkMaker: DrinkMaker800;

    describe("with enough money", () => {
            let coffeeMachine: CoffeeMachine;
            beforeEach(() => {
                const priceTable: Record<Drink, number> = {
                    [Drink.Coffee]: 0.0,
                    [Drink.Tea]: 0.0,
                    [Drink.Chocolate]: 0.0,
                    [Drink.OrangeJuice]: 0.0
                }
                drinkMaker = mock<DrinkMaker800>();
                coffeeMachine = aCoffeeMachine(drinkMaker, priceTable);
            });

            it('orders a coffee', () => {
                coffeeMachine.selectCoffee();
                coffeeMachine.makeDrink();

                checkDrinkMakerWasCalledOnceWith("C::");
            });

            it('orders a tea', () => {
                coffeeMachine.selectTea();
                coffeeMachine.makeDrink();

                checkDrinkMakerWasCalledOnceWith("T::");
            });

            it('orders a hot chocolate', () => {
                coffeeMachine.selectChocolate();
                coffeeMachine.makeDrink();

                checkDrinkMakerWasCalledOnceWith("H::");
            });

            it("orders an orange juice", () => {
                coffeeMachine.selectOrangeJuice();
                coffeeMachine.makeDrink();

                checkDrinkMakerWasCalledOnceWith("O::");
            });

            it('orders a drink with one spoon of sugar', () => {
                coffeeMachine.selectChocolate();
                coffeeMachine.addOneSpoonOfSugar();
                coffeeMachine.makeDrink();

                checkDrinkMakerWasCalledOnceWith("H:1:0");
            });

            it('orders a drink with two spoons of sugar', () => {
                coffeeMachine.selectChocolate();
                coffeeMachine.addOneSpoonOfSugar();
                coffeeMachine.addOneSpoonOfSugar();
                coffeeMachine.makeDrink();

                checkDrinkMakerWasCalledOnceWith("H:2:0");
            });

            it('orders a drink with more than two spoons of sugar', () => {
                coffeeMachine.selectChocolate();
                coffeeMachine.addOneSpoonOfSugar();
                coffeeMachine.addOneSpoonOfSugar();
                coffeeMachine.addOneSpoonOfSugar();
                coffeeMachine.makeDrink();

                checkDrinkMakerWasCalledOnceWith("H:2:0");
            });
        }
    );

    describe("with not enough money", () => {
        let coffeeMachine: CoffeeMachine;
        beforeEach(() => {
            const priceTable: Record<Drink, number> = {
                [Drink.Coffee]: 0.6,
                [Drink.Tea]: 0.4,
                [Drink.Chocolate]: 0.5,
                [Drink.OrangeJuice]: 0.6
            }
            drinkMaker = mock<DrinkMaker800>();
            coffeeMachine = aCoffeeMachine(drinkMaker, priceTable);
        });

        it("does not order a coffe", () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.addMoney(0.1);
            coffeeMachine.makeDrink();

            const missingMoneyInCents = 50;
            checkDrinkMakerCalledOnceWithMessageContaining(missingMoneyInCents);
        });

        it("does not order a tea", () => {
            coffeeMachine.selectTea();
            coffeeMachine.addMoney(0.2);
            coffeeMachine.makeDrink();

            const missingMoneyInCents = 20;
            checkDrinkMakerCalledOnceWithMessageContaining(missingMoneyInCents);
        });

        it("does not order a hot chocolate", () => {
            coffeeMachine.selectChocolate();
            coffeeMachine.addMoney(0.4);
            coffeeMachine.makeDrink();

            const missingMoneyInCents = 10;
            checkDrinkMakerCalledOnceWithMessageContaining(missingMoneyInCents);
        });

        it("does not order an orange juice", () => {
            coffeeMachine.selectOrangeJuice();
            coffeeMachine.addMoney(0.5);
            coffeeMachine.makeDrink();

            const missingMoneyInCents = 10;
            checkDrinkMakerCalledOnceWithMessageContaining(missingMoneyInCents);
        });
    });

    describe("extra hot drinks", () => {
        let coffeeMachine: CoffeeMachine;
        beforeEach(() => {
            drinkMaker = mock<DrinkMaker800>();
            const priceTable = {
                [Drink.Tea]: 0.0,
                [Drink.Chocolate]: 0.0,
                [Drink.Coffee]: 0.0,
                [Drink.OrangeJuice]: 0.0,
            };
            coffeeMachine = aCoffeeMachine(drinkMaker, priceTable);
        });

        it("order a tea", () => {
            coffeeMachine.selectTea();
            coffeeMachine.selectExtraHot();
            coffeeMachine.makeDrink();

            checkDrinkMakerWasCalledOnceWith("Th::");
        });

        it("order an orange juice (they can not be hot)", () => {
            coffeeMachine.selectOrangeJuice();
            coffeeMachine.selectExtraHot();
            coffeeMachine.makeDrink();

            checkDrinkMakerWasCalledOnceWith("O::");
        });
    });

    describe("resets", () => {
        let coffeeMachine: CoffeeMachine;
        beforeEach(() => {
            const priceTable: Record<Drink, number> = {
                [Drink.Coffee]: 0.6,
                [Drink.Tea]: 0.4,
                [Drink.Chocolate]: 0.5,
                [Drink.OrangeJuice]: 0.6
            }
            drinkMaker = mock<DrinkMaker800>();
            coffeeMachine =  aCoffeeMachine(drinkMaker, priceTable);
        });

        it('after making a drink', () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.addMoney(0.6);
            coffeeMachine.makeDrink();

            coffeeMachine.makeDrink();

            checkDrinkMakeReceivedSelectDrinkMessage();
        });

        it('to avoid previous money insertion to leak into the next order', () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.addMoney(0.6);
            coffeeMachine.makeDrink();

            coffeeMachine.selectCoffee();
            coffeeMachine.makeDrink();

            const missingMoneyInCents = 60;
            checkDrinkMakerWasLastCalledWithMessageContaining(missingMoneyInCents);
        });

        it('to avoid previous sugar selection to leak into the next order', () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.addMoney(0.6);
            coffeeMachine.addOneSpoonOfSugar();
            coffeeMachine.makeDrink();

            coffeeMachine.selectCoffee();
            coffeeMachine.addMoney(0.6);
            coffeeMachine.makeDrink();

            checkDrinkMakerWasCalledLastWith("C::");
        });

        it('to avoid previous extra hot selection to leak into the next order', () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.addMoney(0.6);
            coffeeMachine.selectExtraHot();
            coffeeMachine.makeDrink();

            coffeeMachine.selectCoffee();
            coffeeMachine.addMoney(0.6);
            coffeeMachine.makeDrink();

            checkDrinkMakerWasCalledLastWith("C::");
        });
    });

    function checkDrinkMakerWasCalledOnceWith(command: string) {
        verify(drinkMaker.execute(anyString())).once();
        checkDrinkMakerWasCalledLastWith(command);
    }

    function checkDrinkMakerWasCalledLastWith(command: string) {
        verify(drinkMaker.execute(anyString())).called();
        expect(getDrinkMakerLastCommand()).toEqual(command);
    }

    function getDrinkMakerLastCommand() {
        const args = capture(drinkMaker.execute).last();
        return args[0];
    }

    function checkDrinkMakerCalledOnceWithMessageContaining(missingMoneyInCents: number) {
        verify(drinkMaker.execute(anyString())).once();
        checkDrinkMakerWasLastCalledWithMessageContaining(missingMoneyInCents)
    }

    function checkDrinkMakerWasLastCalledWithMessageContaining(missingMoneyInCents: number) {
        verify(drinkMaker.execute(anyString())).called();
        checkDrinkMakerMessageMatch(getDrinkMakerLastCommand(), `.*${missingMoneyInCents / 100}.*`);
    }

    function checkDrinkMakeReceivedSelectDrinkMessage() {
        checkDrinkMakerWasCalledLastWith("M:Select a drink, please");
    }

    function checkDrinkMakerMessageMatch(actualMessage: string, expectedMessage: string) {
        expect(actualMessage).toMatch(new RegExp(`M:${expectedMessage}`));
    }
});

function aCoffeeMachine(drinkMaker: DrinkMaker800, priceTable: Record<Drink, number>) {
    return new CoffeeMachine(instance(drinkMaker), priceTable);
}