class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`------- Hello my name is ${this.name} and age is ${this.age} -------`);
    }
}

const person1 = new Person("Rony", 24);
person1.greet();
