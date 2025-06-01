class User {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

class AuthService {
    private users: User[];

    constructor() {
        this.users = [];
    }

    register(user: User): string {
        const exists = this.users.find((u) => u.username === user.username);
        if (exists) return "Username already taken.";

        this.users.push(user);
        return "Registration successful!";
    }

    login(username: string, password: string): string {
        const user = this.users.find((u) => u.username === username && u.password === password);
        if (!user) return "Invalid credentials. Please try again or register.";
        return "Login successful!";
    }
}

const auth = new AuthService();
console.log(auth.register(new User("Ronin", "root"))); // ✅ Register
console.log(auth.register(new User("Ronin", "root"))); // ❌ Duplicate
console.log(auth.login("ro", "ro")); // ❌ Wrong
console.log(auth.login("Ronin", "root")); // ✅ Login
