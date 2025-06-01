abstract class Shape {
    abstract getArea(): number;
}

class Circle extends Shape {
    radius: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Square extends Shape {
    side: number;

    constructor(side: number) {
        super();
        this.side = side;
    }

    getArea(): number {
        return this.side * this.side;
    }
}

// ✅ Polymorphic behavior
const shapes: Shape[] = [new Circle(5), new Square(4)];

for (const shape of shapes) {
    console.log("Area:", shape.getArea());
}
