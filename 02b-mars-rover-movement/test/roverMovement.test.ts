import {Rover} from "../src/rover";

describe('Rover moves', () => {
  
  it("forwards when facing north", () => {
    const rover = new Rover(0, 0, "N");

    rover.receive("f");

    expect(rover).toEqual(new Rover(0, 1, "N"));
  });
});
