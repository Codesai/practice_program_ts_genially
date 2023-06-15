import {Rover} from "../src/rover";

describe('Rover rotates', () => {
  it("left when facing north", () => {
    const rover = new Rover(0, 0, "N");

    rover.receive("l");

    expect(rover).toEqual(new Rover(0, 0, "W"));
  });

  it("right when facing north", () => {
    const rover = new Rover(0, 0, "N");

    rover.receive("r");

    expect(rover).toEqual(new Rover(0, 0, "E"));
  });

  it("left when facing south", () => {
    const rover = new Rover(0, 0, "S");

    rover.receive("l");

    expect(rover).toEqual(new Rover(0, 0, "E"));
  });

  it("right when facing south", () => {
    const rover = new Rover(0, 0, "S");

    rover.receive("r");

    expect(rover).toEqual(new Rover(0, 0, "W"));
  });

  it("left when facing west", () => {
    const rover = new Rover(0, 0, "W");

    rover.receive("l");

    expect(rover).toEqual(new Rover(0, 0, "S"));
  });

  it("right when facing west", () => {
    const rover = new Rover(0, 0, "W");

    rover.receive("r");

    expect(rover).toEqual(new Rover(0, 0, "N"));
  });

  it("left when facing east", () => {
    const rover = new Rover(0, 0, "E");

    rover.receive("l");

    expect(rover).toEqual(new Rover(0, 0, "N"));
  });

  it("right when facing east", () => {
    const rover = new Rover(0, 0, "E");

    rover.receive("r");

    expect(rover).toEqual(new Rover(0, 0, "S"));
  });
});
