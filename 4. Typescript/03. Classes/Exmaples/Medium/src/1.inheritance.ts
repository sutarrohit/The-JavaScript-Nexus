class Employee {
    protected name: string;
    protected salary: number;

    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
    }

    getDetails() {
        return `employee name ${this.name} and salary is ${this.salary}`;
    }
}

class Manager extends Employee {
    department: string;

    constructor(name: string, salary: number, department: string) {
        super(name, salary);
        this.department = department;
    }
}

const manager = new Manager("Rony", 40000, "IT");
console.log(manager.getDetails());
console.log(manager.department);
