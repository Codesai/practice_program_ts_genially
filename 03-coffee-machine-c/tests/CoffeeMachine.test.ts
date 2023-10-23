import {anyString, capture, instance, mock, verify} from "ts-mockito";
import {DrinkMaker} from "../src/DrinkMaker";
import {CoffeeMachine} from "../src/CoffeeMachine";

describe('Coffee Machine', () => {
    let drinkMaker: DrinkMaker;

    describe("with enough money", () => {
            let coffeeMachine: CoffeeMachine;
            beforeEach(() => {
                drinkMaker = mock<DrinkMaker>();
                coffeeMachine = new CoffeeMachine(instance(drinkMaker));
                coffeeMachine.addMoney(10000);
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
                drinkMaker = mock<DrinkMaker>();
                coffeeMachine = new CoffeeMachine(instance(drinkMaker));
            });

            it("does not order a coffe", () => {
                coffeeMachine.selectCoffee();
                coffeeMachine.addMoney(0.1);
                coffeeMachine.makeDrink();

                const missingMoneyInCents = 50;
                checkDrinkMakerMessageContains(missingMoneyInCents);
            });

            it("does not order a tea", () => {
                coffeeMachine.selectTea();
                coffeeMachine.addMoney(0.2);
                coffeeMachine.makeDrink();

                const missingMoneyInCents = 20;
                checkDrinkMakerMessageContains(missingMoneyInCents);
            });

            it("does not order a hot chocolate", () => {
                coffeeMachine.selectChocolate();
                coffeeMachine.addMoney(0.4);
                coffeeMachine.makeDrink();

                const missingMoneyInCents = 10;
                checkDrinkMakerMessageContains(missingMoneyInCents);
            });
        }
    )

    function checkDrinkMakerWasCalledOnceWith(command: string) {
        verify(drinkMaker.execute(anyString())).once();
        const args = capture(drinkMaker.execute).last();
        expect(args).toEqual([command]);
    }

    function checkDrinkMakerMessageContains(missingMoneyInCents: number) {
        verify(drinkMaker.execute(anyString())).once();
        const args = capture(drinkMaker.execute).last();
        expect(args[0]).toMatch(new RegExp(`M:.*${missingMoneyInCents / 100}.*`));
    }
});