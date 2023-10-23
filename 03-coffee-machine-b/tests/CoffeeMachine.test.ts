import {anyString, capture, instance, mock, verify} from "ts-mockito";
import {DrinkMaker} from "../src/DrinkMaker";
import {CoffeeMachine} from "../src/CoffeeMachine";

describe('Coffee Machine', () => {
    let drinkMaker: DrinkMaker;
    let coffeeMachine: CoffeeMachine;
    beforeEach(() => {
        drinkMaker = mock<DrinkMaker>();
        coffeeMachine = new CoffeeMachine(instance(drinkMaker));
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


    function checkDrinkMakerWasCalledOnceWith(command: string) {
        verify(drinkMaker.execute(anyString())).once();
        const args = capture(drinkMaker.execute).last();
        expect(args).toEqual([command]);
    }
});