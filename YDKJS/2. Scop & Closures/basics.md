## ✅ Is JavaScript Interpreted or Compiled?

JavaScript is **both interpreted and compiled**, depending on the engine and context.

-   **Historically**: Interpreted.
-   **Modern Engines (like V8)**: Use **Just-In-Time (JIT)** compilation for speed.

---

### ⚙️ How JavaScript Runs in Modern Engines (e.g. V8)

#### 1. **Parsing Phase**

-   JavaScript source code is parsed into an **Abstract Syntax Tree (AST)**.
-   This step analyzes the syntax but does **not interpret or execute** the code yet.

#### 2. **Interpretation: Bytecode Generation & Execution**

-   The AST is sent to the **Ignition interpreter**.
-   Ignition compiles it into **bytecode** (a simplified low-level representation).
-   The **bytecode is interpreted line-by-line and executed**.

✅ **This is the actual "interpretation" phase** in modern engines.

> 🔍 Example:
> A function like `add(a, b) { return a + b; }` becomes bytecode instructions such as `LdaNamedProperty`, `Add`, `Return`, which the interpreter executes.

#### 3. **JIT Compilation for Performance**

-   If the interpreter sees a function being run **frequently**, it marks it as **"hot."**
-   The function is sent to **TurboFan (JIT compiler)**.
-   It is compiled into **machine code** (native CPU instructions) for faster execution.

## 🔁 Execution Flow in Modern Engines

```
JavaScript Source Code
     ↓
   Parser → AST
     ↓
Interpreter (Ignition) → Bytecode (interpreted)
     ↓ (if hot code)
 JIT Compiler (TurboFan) → Machine Code (compiled)
```

---
