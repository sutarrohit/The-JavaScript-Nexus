class Rectangle {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    getArea() {
        console.log(`---- Area is ${this.width * this.height} ----`);
    }
}

const area = new Rectangle(10, 40);
area.getArea();
