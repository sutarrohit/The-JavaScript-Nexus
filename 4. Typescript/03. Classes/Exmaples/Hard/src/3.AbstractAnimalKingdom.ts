abstract class Animal {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    // Abstract method to be implemented by subclasses
    abstract makeSound(): void;
}

class Dog extends Animal {
    makeSound(): void {
        console.log(`${this.name} says: Woof!`);
    }

    play(): void {
        console.log(`${this.name} is fetching a ball!`);
    }
}

class Cat extends Animal {
    makeSound(): void {
        console.log(`${this.name} says: Meow!`);
    }

    play(): void {
        console.log(`${this.name} is chasing a laser pointer!`);
    }
}

function interactWithAnimal(animal: Animal): void {
    animal.makeSound();

    // Type narrowing to call play() if available
    if (animal instanceof Dog || animal instanceof Cat) {
        animal.play();
    }
}

const dog = new Dog("Buddy");
const cat = new Cat("Whiskers");

interactWithAnimal(dog);
// Buddy says: Woof!
// Buddy is fetching a ball!

interactWithAnimal(cat);
// Whiskers says: Meow!
// Whiskers is chasing a laser pointer!
