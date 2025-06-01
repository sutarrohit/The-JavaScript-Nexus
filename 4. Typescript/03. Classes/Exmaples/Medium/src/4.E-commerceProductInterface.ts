interface Product {
    id: string;
    name: string;
    price: number;
}

class Store {
    products: Product[];

    constructor() {
        this.products = [];
    }

    addProduct(product: Product) {
        this.products.push(product);
    }

    getTotalValue() {
        let totalValue = 0;
        for (const product of this.products) {
            totalValue += product.price;
        }

        return totalValue;
    }
}

const store = new Store();

store.addProduct({ id: "ffsdfds", name: "car", price: 40 });
store.addProduct({ id: "fsdffsdfd", name: "bike", price: 40 });

console.log(store.getTotalValue());
