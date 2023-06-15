export class Rover {
    private direction: string;
    private y: number;
    private x: number;

    constructor(x: number, y: number, direction: string) {
        this.direction = direction;
        this.y = y;
        this.x = x;
    }

    public receive(commandsSequence: string): void {
        for (let i = 0; i < commandsSequence.length; i++) {
            let command = commandsSequence.charAt(i);

            if (command == 'l') {
                if (this.direction == "N") {
                    this.direction = "W";
                } else if (this.direction == "S") {
                    this.direction = "E";
                } else if (this.direction == "W") {
                    this.direction = "S";
                } else {
                    this.direction = "N";
                }
            } else if (command == 'r') {
                if (this.direction == "N") {
                    this.direction = "E";
                } else if (this.direction == "S") {
                    this.direction = "W";
                } else if (this.direction == "W") {
                    this.direction = "N";
                } else {
                    this.direction = "S";
                }
            } else {
                this.y += 1;
            }
        }
    }
}
