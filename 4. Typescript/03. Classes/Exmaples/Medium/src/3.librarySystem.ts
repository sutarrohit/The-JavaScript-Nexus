class Book {
    title: string;
    author: string;

    constructor(title: string, author: string) {
        this.title = title;
        this.author = author;
    }
}

class Library {
    store: Book[];

    constructor() {
        this.store = [];
    }

    addBook(book: Book) {
        this.store.push(book);
    }

    getBook() {
        return this.store;
    }
}

const lib = new Library();

const book1 = new Book("Ronin1", "Prometheus1");
const book2 = new Book("Ronin2", "Prometheus2");
const book3 = new Book("Ronin3", "Prometheus3");
const book4 = new Book("Ronin4", "Prometheus4");
// lib.addBook({ title: "Ronin", author: "Prometheus" });
lib.addBook(book1);
lib.addBook(book2);
lib.addBook(book3);
lib.addBook(book4);

console.log("getBook", lib.getBook());
