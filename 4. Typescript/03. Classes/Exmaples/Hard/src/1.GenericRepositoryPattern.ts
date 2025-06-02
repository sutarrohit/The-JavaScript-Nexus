import crypto from "crypto";

class Repository<T extends { id: string }> {
    private store = new Map<string, T>();

    add(item: T) {
        this.store.set(item.id, item);
    }

    getById(id: string) {
        const item = this.store.get(id);
        return item;
    }

    getAll() {
        const items = Array.from(this.store.values());
        return items;
    }

    delete(id: string) {
        const deletedItem = this.store.delete(id);
        return deletedItem;
    }
}

type User = { id: string; name: string; age: number };
type Order = { id: string; type: string; mode: string; price: number; token: string };
type Item = User | Order;

const repository = new Repository<Item>();
const userId = crypto.randomUUID();
repository.add({ id: userId, name: "ronin", age: 24 });

console.log("userId", userId);
console.log("data", repository.getById(userId));

repository.add({ id: crypto.randomUUID(), type: "spot", mode: "MARKET", price: 1289, token: "BTCUSDT" });
console.log("All data", repository.getAll());
