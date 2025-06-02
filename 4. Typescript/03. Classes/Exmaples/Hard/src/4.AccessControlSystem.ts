class Employee {
    private accessLevel: number;
    protected name: string;
    protected department: string;

    constructor(name: string, department: string, accessLevel: number) {
        this.name = name;
        this.department = department;
        this.accessLevel = accessLevel;
    }

    public getName(): string {
        return this.name;
    }

    public getInfo(): void {
        console.log(`${this.name} works in ${this.department} with access level ${this.accessLevel}`);
    }

    // Make these public so subclasses can act on other instances
    public setDepartment(newDepartment: string): void {
        this.department = newDepartment;
    }

    public setAccessLevel(level: number): void {
        this.accessLevel = level;
    }
}

class Manager extends Employee {
    changeDepartment(employee: Employee, newDepartment: string): void {
        console.log(`${this.getName()} is changing ${employee.getName()}'s department to ${newDepartment}`);
        employee.setDepartment(newDepartment);
    }
}

class Director extends Employee {
    changeAccessLevel(employee: Employee, newLevel: number): void {
        console.log(`${this.getName()} is changing ${employee.getName()}'s access level to ${newLevel}`);
        employee.setAccessLevel(newLevel);
    }
}

const emp1 = new Employee("Alice", "Engineering", 2);
const manager = new Manager("Bob", "Engineering", 3);
const director = new Director("Clara", "Executive", 5);

emp1.getInfo(); // Alice works in Engineering with access level 2

manager.changeDepartment(emp1, "Design");
emp1.getInfo(); // Alice works in Design with access level 2

director.changeAccessLevel(emp1, 4);
emp1.getInfo(); // Alice works in Design with access level 4
