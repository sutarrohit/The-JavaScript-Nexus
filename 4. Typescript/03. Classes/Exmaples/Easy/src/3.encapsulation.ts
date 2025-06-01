class BankAccount {
    private balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    deposit(amount: number) {
        if (amount <= 0) {
            console.log("Deposit amount must be positive.");
            return;
        }

        this.balance += amount;
    }

    withdraw(amount: number) {
        if (amount <= 0) {
            console.log("Withdraw amount must be positive.");
            return;
        }
        if (amount > this.balance) {
            console.log("Insufficient balance.");
            return;
        }
        this.balance -= amount;
    }

    get currentBalance() {
        return this.balance;
    }
}

const bank = new BankAccount(2500);
console.log("balance---------", bank.currentBalance);

bank.deposit(2000);
console.log("after deposit balance", bank.currentBalance);

bank.withdraw(2800);
console.log("after withdraw balance", bank.currentBalance);
