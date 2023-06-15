import {Rover} from "../src/rover";

describe('Rover receiving', () => {
  it("no commands", () => {
    const rover = new Rover(0, 0, "N");

    rover.receive("");

    expect(rover).toEqual(new Rover(0, 0, "N"));
  });


})
