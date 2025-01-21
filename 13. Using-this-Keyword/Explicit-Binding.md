# Explicit Binding :

The `call()`, `apply()`, and `bind()` methods in JavaScript are used to explicitly control the value of `this` when invoking a function. These methods are particularly useful when you want a function to execute in the context of a specific object, regardless of how it was defined or called.

### **Key Differences: `bind()` vs `call()` vs `apply()`**

| **Feature**                | **`call()`**                                                          | **`apply()`**                                                                   | **`bind()`**                                                                |
| -------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Execution**              | Executes the function immediately.                                    | Executes the function immediately.                                              | Returns a new function; does not execute immediately.                       |
| **Arguments Format**       | Passed individually as arguments: `fn.call(thisArg, arg1, arg2, ...)` | Passed as an array or array-like object: `fn.apply(thisArg, [arg1, arg2, ...])` | Passed partially or fully as arguments: `fn.bind(thisArg, arg1, arg2, ...)` |
| **Return Value**           | The return value of the invoked function.                             | The return value of the invoked function.                                       | A new function with `this` bound to `thisArg`.                              |
| **`this` Binding**         | Explicitly sets `this` for the function being called.                 | Explicitly sets `this` for the function being called.                           | Permanently binds `this` to the specified value for the new function.       |
| **Immediate Execution**    | Yes.                                                                  | Yes.                                                                            | No.                                                                         |
| **Use Case: Preset Args**  | Can’t preset arguments; must pass all at once.                        | Can’t preset arguments; must pass all at once.                                  | Can preset arguments for future use (partial application).                  |
| **Common Use Cases**       | Invoke a function with specific `this` and arguments.                 | Invoke a function with specific `this` and arguments in array form.             | Create a new function with a fixed `this` and optional preset arguments.    |
| **Example Usage**          | `fn.call(obj, 1, 2)`                                                  | `fn.apply(obj, [1, 2])`                                                         | `const boundFn = fn.bind(obj, 1); boundFn(2);`                              |
| **Dynamic `this` Context** | Changes `this` dynamically for immediate function calls.              | Changes `this` dynamically for immediate function calls.                        | Fixes `this` context permanently for future calls.                          |
| **Reusability**            | Not reusable; must call each time.                                    | Not reusable; must call each time.                                              | Reusable; returns a function that can be called multiple times.             |
| **Partial Application**    | No.                                                                   | No.                                                                             | Yes, supports partial application.                                          |

---

# 1. call() :

The `call()` method in JavaScript is used to **explicitly invoke a function** with a specified value for `this` and arguments provided **individually**. This is particularly useful when you want to control the `this` context within a function, allowing you to borrow methods or execute functions in the context of another object.

### **Syntax**

```javascript
functionName.call(thisArg, arg1, arg2, ...);
```

- **`functionName`**: The function to be called.
- **`thisArg`**: The value of `this` that will be used inside the function.
  - If `thisArg` is:
    - `null` or `undefined`: `this` will default to the global object (`window` in browsers or `global` in Node.js). In strict mode, `this` will remain `null` or `undefined`.
    - A primitive value: It will be boxed (e.g., a string becomes a `String` object).
- **`arg1, arg2, ...`**: Arguments passed to the function.

---

### **Examples**

#### **1. Basic Usage**

Using `call()` to invoke a function with a specific `this` value.

```javascript
const person = {
  firstName: "Alice",
  lastName: "Smith",
};

function greet(greeting) {
  console.log(`${greeting}, ${this.firstName} ${this.lastName}`);
}

greet.call(person, "Hello"); // Output: Hello, Alice Smith
```

Here:

- The `greet` function is invoked with `this` explicitly set to `person`.
- The argument `"Hello"` is passed as the `greeting`.

---

#### **2. Borrowing Methods**

`call()` allows one object to borrow a method from another object.

```javascript
const person1 = {
  fullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
};

const person2 = {
  firstName: "Bob",
  lastName: "Brown",
};

// Borrow `fullName` from `person1` for `person2`
console.log(person1.fullName.call(person2)); // Output: Bob Brown
```

Here:

- `person1.fullName` is called in the context of `person2`.

---

#### **3. Using `call()` with Primitive Values**

When `thisArg` is a primitive value, JavaScript automatically wraps it in its corresponding object type.

```javascript
function showType() {
  console.log(typeof this);
}

showType.call("Hello"); // Output: object (String object)
showType.call(42); // Output: object (Number object)
```

---

#### **4. Invoking Functions with Arguments**

You can pass multiple arguments to the function via `call()`.

```javascript
function introduce(greeting, punctuation) {
  console.log(`${greeting}, I am ${this.name}${punctuation}`);
}

const person = { name: "Charlie" };

introduce.call(person, "Hi", "!"); // Output: Hi, I am Charlie!
```

---

#### **5. Using `call()` with the Global Object**

If no `thisArg` is provided, or it is `null` or `undefined`, `this` defaults to the global object (`window` in browsers, `global` in Node.js).

```javascript
function showGlobal() {
  console.log(this);
}

showGlobal.call(); // Logs the global object
showGlobal.call(null); // Logs the global object (non-strict mode)
showGlobal.call(undefined); // Logs the global object (non-strict mode)
```

In **strict mode**, `this` remains `undefined` if `null` or `undefined` is passed.

```javascript
"use strict";

function showStrict() {
  console.log(this);
}

showStrict.call(); // undefined
showStrict.call(null); // null
showStrict.call(undefined); // undefined
```

---

### **When to Use `call()`**

#### **1. Borrowing Functions**

`call()` is commonly used to borrow methods from other objects to avoid code duplication.

#### **2. Invoking a Function with a Specific Context**

If you want to control the value of `this` explicitly, `call()` is perfect.

#### **3. Working with Functions That Require Explicit Context**

For example, using `Math.max()` with an array of numbers (though `apply()` or the spread operator are more common here):

```javascript
const numbers = [1, 2, 3];
console.log(Math.max.call(null, ...numbers)); // Output: 3
```

---

---

# 2. apply() :

The `apply()` method is similar to `call()`. It is used to **explicitly invoke a function** with a specified value for `this` and arguments passed as an **array or array-like object**. This makes it particularly useful when you have arguments in an array and need to pass them to a function.

---

### **Syntax**

```javascript
functionName.apply(thisArg, [argsArray]);
```

- **`functionName`**: The function to be called.
- **`thisArg`**: The value of `this` that will be used inside the function.
  - If `thisArg` is:
    - `null` or `undefined`: `this` defaults to the global object (`window` in browsers or `global` in Node.js). In strict mode, it will remain `null` or `undefined`.
    - A primitive value: It will be boxed into its corresponding object type.
- **`[argsArray]`**: An array or array-like object containing the arguments for the function.

---

### **Examples**

#### **1. Basic Usage**

Using `apply()` to invoke a function with arguments provided in an array.

```javascript
const person = {
  fullName: function (greeting, punctuation) {
    return `${greeting}, ${this.firstName} ${this.lastName}${punctuation}`;
  },
};

const personInfo = {
  firstName: "Alice",
  lastName: "Smith",
};

// Call `fullName` with `personInfo` as `this` and arguments in an array
console.log(person.fullName.apply(personInfo, ["Hello", "!"]));
// Output: Hello, Alice Smith!
```

---

#### **2. Finding Maximum/Minimum with `Math.max` or `Math.min`**

You can use `apply()` to pass an array of numbers to functions like `Math.max` or `Math.min`.

```javascript
const numbers = [5, 10, 15, 20];

const max = Math.max.apply(null, numbers);
const min = Math.min.apply(null, numbers);

console.log(max); // Output: 20
console.log(min); // Output: 5
```

Here:

- `thisArg` is `null` because `Math.max` and `Math.min` don’t rely on `this`.
- The array `numbers` is passed as an argument.

---

#### **3. Borrowing Methods**

`apply()` can be used to borrow methods from one object for another.

```javascript
const arrayLikeObject = { 0: "a", 1: "b", 2: "c", length: 3 };

const result = Array.prototype.join.apply(arrayLikeObject, [", "]);

console.log(result); // Output: a, b, c
```

Here:

- `Array.prototype.join` is borrowed and used on the array-like object.

---

#### **4. Using `apply()` with Arguments**

When you already have arguments in an array, `apply()` is ideal.

```javascript
function sum(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];

console.log(sum.apply(null, numbers)); // Output: 6
```

---

#### **5. Using `apply()` with the Global Object**

If no `thisArg` is provided, or it is `null`/`undefined`, the global object is used as the default context.

```javascript
function showThis() {
  console.log(this);
}

showThis.apply(); // Logs the global object
showThis.apply(null); // Logs the global object (non-strict mode)
showThis.apply(undefined); // Logs the global object (non-strict mode)
```

In **strict mode**, `this` remains `null` or `undefined`.

---

### **`call()` vs `apply()`**

| Feature   | `call()`                          | `apply()`                                         |
| --------- | --------------------------------- | ------------------------------------------------- |
| Arguments | Passed individually: `arg1, arg2` | Passed as an array: `[arg1, arg2]`                |
| Use Case  | Fixed number of arguments         | Arguments are in an array or array-like structure |
| Example   | `fn.call(obj, a, b)`              | `fn.apply(obj, [a, b])`                           |

---

### **When to Use `apply()`**

1. **When Arguments Are in an Array**: If your function requires multiple arguments and they are already in an array, `apply()` is the cleanest way to pass them.
2. **Borrowing Methods for Array-Like Objects**: Use `apply()` to work with array-like objects (e.g., `arguments`, NodeLists) by borrowing array methods like `slice`, `join`, etc.

3. **Dynamic Function Calls**: When arguments are dynamically determined at runtime and stored in an array.

---

### **Modern Alternative**

In ES6+, the **spread syntax (`...`)** provides a cleaner and more readable way to achieve the same result:

```javascript
const numbers = [5, 10, 15, 20];

const max = Math.max(...numbers);
const min = Math.min(...numbers);

console.log(max); // Output: 20
console.log(min); // Output: 5
```

---

---

# 3. bind():

### **JavaScript `bind()` Method**

The `bind()` method in JavaScript is used to create a new function with a specific value of `this` and optionally preset arguments. Unlike `call()` and `apply()`, which **invoke the function immediately**, `bind()` returns a new function that you can call later.

### **Syntax**

```javascript
functionName.bind(thisArg, arg1, arg2, ...);
```

- **`functionName`**: The function to bind.
- **`thisArg`**: The value to set as `this` for the new function.
  - If `thisArg` is:
    - `null` or `undefined`: `this` defaults to the global object (in non-strict mode) or remains `undefined` (in strict mode).
    - A primitive value: It is boxed (e.g., a string becomes a `String` object).
- **`arg1, arg2, ...`**: Optional arguments to be prefilled when the new function is called.

---

### **Key Features of `bind()`**

1. **Returns a New Function**: It does not execute the original function immediately.
2. **Sets a Specific `this` Context**: The `thisArg` value is fixed for the returned function.
3. **Supports Partial Application**: You can preset some arguments for the function.

---

### **Examples**

#### **1. Binding `this`**

```javascript
const person = {
  firstName: "Alice",
  lastName: "Smith",
  fullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
};

const getFullName = person.fullName.bind(person);

console.log(getFullName()); // Output: Alice Smith
```

Here:

- The `fullName` method is bound to the `person` object.
- `getFullName` can now be called independently without losing the `this` context.

---

#### **2. Presetting Arguments (Partial Application)**

You can preset some arguments when using `bind()`.

```javascript
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2); // `a` is fixed to 2

console.log(double(5)); // Output: 10
console.log(double(10)); // Output: 20
```

Here:

- The first argument (`a`) is set to `2` using `bind()`.
- The returned function `double` only requires one argument (`b`).

---

#### **3. Using `bind()` with Event Listeners**

In event handlers, `this` can change depending on the context. Using `bind()` ensures that `this` refers to the desired object.

```javascript
function Button(label) {
  this.label = label;
}

Button.prototype.handleClick = function () {
  console.log(`Button clicked: ${this.label}`);
};

const button = new Button("Submit");

const buttonElement = document.getElementById("myButton");
buttonElement.addEventListener("click", button.handleClick.bind(button));
```

Here:

- Without `bind()`, `this` would refer to the button element (`buttonElement`), not the `Button` object.
- `bind(button)` ensures `this` refers to the `Button` instance.

---

#### **4. Creating Copies of Functions with Fixed Context**

You can create multiple versions of a function with different `this` contexts.

```javascript
const obj1 = { value: 1 };
const obj2 = { value: 2 };

function showValue() {
  console.log(this.value);
}

const showValueForObj1 = showValue.bind(obj1);
const showValueForObj2 = showValue.bind(obj2);

showValueForObj1(); // Output: 1
showValueForObj2(); // Output: 2
```

---

#### **5. Using `bind()` in a Constructor Function**

In JavaScript classes or constructor functions, `bind()` is useful to fix the `this` context for methods passed as callbacks.

```javascript
class Counter {
  constructor() {
    this.count = 0;
    this.increment = this.increment.bind(this); // Bind `this` to the instance
  }

  increment() {
    this.count++;
    console.log(this.count);
  }
}

const counter = new Counter();
const incrementFn = counter.increment;

incrementFn(); // Output: 1
```

Without `bind()`, `this` would be `undefined` or refer to the global object, depending on the environment.

---

### **When to Use `bind()`**

1. **When `this` Needs to Be Fixed**: Use `bind()` when you need to ensure the `this` context doesn’t change (e.g., in callbacks or event listeners).
2. **Partial Application**: Use `bind()` to preset some arguments for a function.
3. **Reusable Functions**: Create multiple versions of a function with different `this` contexts.

---
