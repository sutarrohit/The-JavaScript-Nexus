# What is the Model Context Protocol (MCP)?

MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems.

Using MCP, AI applications like Claude or ChatGPT can connect to data sources (e.g. local files, databases), tools (e.g. search engines, calculators) and workflows (e.g. specialized prompts)—enabling them to access key information and perform tasks.

Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect electronic devices, MCP provides a standardized way to connect AI applications to external systems.

![](https://mintcdn.com/mcp/bEUxYpZqie0DsluH/images/mcp-simple-diagram.png?fit=max&auto=format&n=bEUxYpZqie0DsluH&q=85&s=35268aa0ad50b8c385913810e7604550)

## What can MCP enable?

-   Agents can access your Google Calendar and Notion, acting as a more personalized AI assistant.
-   Claude Code can generate an entire web app using a Figma design.
-   Enterprise chatbots can connect to multiple databases across an organization, empowering users to analyze data using chat.
-   AI models can create 3D designs on Blender and print them out using a 3D printer.

## Why does MCP matter?

Depending on where you sit in the ecosystem, MCP can have a range of benefits.

-   **Developers**: MCP reduces development time and complexity when building, or integrating with, an AI application or agent.
-   **AI applications or agents**: MCP provides access to an ecosystem of data sources, tools and apps which will enhance capabilities and improve the end-user experience.
-   **End-users**: MCP results in more capable AI applications or agents which can access your data and take actions on your behalf when necessary.

## Start Building

<CardGroup cols={2}>
  <Card title="Build servers" icon="server" href="/docs/develop/build-server">
    Create MCP servers to expose your data and tools
  </Card>

  <Card title="Build clients" icon="computer" href="/docs/develop/build-client">
    Develop applications that connect to MCP servers
  </Card>
</CardGroup>

## Learn more

<CardGroup cols={2}>
  <Card title="Understand concepts" icon="book" href="/docs/learn/architecture">
    Learn the core concepts and architecture of MCP
  </Card>
</CardGroup>

---

---

## 1. 🛠️ Tools in MCP

### ✅ What is a Tool?

A **tool** is a function or capability that your MCP server exposes for the AI model to **execute real actions**.

Think of tools as:

> “API endpoints that the AI can intelligently call”

### ✅ Examples of Tools

-   `get_weather(lat, lon)`
-   `create_user(name, email)`
-   `fetch_crypto_price(symbol)`
-   `place_trade(order)`

### ✅ Why Tools Exist

LLMs **cannot:**

-   Access databases
-   Call external APIs
-   Perform real transactions
    So MCP uses **tools as a bridge between AI and real systems**.

### ✅ How It’s Used

1. User asks: _“What’s the price of BTC?”_
2. Model decides to call `get_btc_price`
3. MCP server executes the function
4. Result is sent back to the model
5. Model converts it into a human reply

👉 Tools = **Action layer of MCP**

---

## 2. 📦 Resources in MCP

### ✅ What is a Resource?

A **resource** is a **read-only piece of data** that the AI can fetch and use as context.

Think of a resource as:

> “Static or dynamic data the AI can look at”

### ✅ Examples of Resources

-   A file: `/docs/api.md`
-   Database snapshot
-   Log files
-   Configuration JSON
-   Git repo info

### ✅ Why Resources Exist

The model needs **extra knowledge** that:

-   Is not in its training data
-   Is specific to _your_ system

### ✅ How It’s Used

-   AI requests a resource
-   MCP server returns its content
-   AI uses it to answer better

👉 Resources = **Knowledge layer of MCP**

---

## 3. 💬 Prompts in MCP

### ✅ What is a Prompt?

A **prompt** is a reusable **instruction template** that tells the AI _how to behave_ or _how to respond_.

It defines:

-   Role
-   Behavior
-   Format
-   Tone
-   Constraints

### ✅ Example Prompt

```text
You are an expert crypto trading assistant.
Only answer using the available tools.
Do not guess prices.
```

### ✅ Why Prompts Exist

They:

-   Control **AI behavior**
-   Enforce **safety rules**
-   Improve **consistency**
-   Prevent hallucinations

### ✅ How It’s Used

Prompts are injected before the model runs:

-   System prompt
-   Task prompt
-   Developer rules

👉 Prompts = **Brain configuration of the AI**

---

## 4. 🎲 Sampling in MCP

### ✅ What is Sampling?

**Sampling controls how the model generates text.**
It affects **randomness, creativity, and determinism**.

Common sampling parameters:

-   `temperature`
-   `top_p`
-   `max_tokens`
-   `frequency_penalty`

### ✅ Simple Explanation

| Setting                 | Effect                 |
| ----------------------- | ---------------------- |
| Low temperature (0–0.3) | Deterministic, factual |
| Medium (0.5–0.7)        | Balanced               |
| High (0.9–1.2)          | Creative, risky        |

### ✅ Why Sampling Exists

Different use cases need different behavior:

-   ✅ Trading bots → low randomness
-   ✅ Chatbots → medium
-   ✅ Story writing → high

👉 Sampling = **Personality control knob of the model**

---

## ✅ How All 4 Work Together (Big Picture)

```
User Question
     ↓
Prompt (rules + behavior)
     ↓
Model decides:
  - Use Tool?
  - Fetch Resource?
     ↓
Tool executes OR Resource is read
     ↓
Result sent back to model
     ↓
Sampling controls how the final answer is generated
     ↓
User gets final response
```

---

## ✅ Real Example (Crypto App Like Yours – PaperDEX)

### User:

> “Buy 0.01 BTC at market price”

### Flow:

1. **Prompt** enforces:

    > “Only place trades via tools.”

2. Model calls **Tool**:

    ```json
    place_order({ symbol: "BTC", qty: 0.01, type: "MARKET" })
    ```

3. **Resource** may be read:

    - User balance
    - Current order book

4. **Sampling** ensures:

    - Low temperature so no creative mistakes

5. Final clean response:

    > ✅ Order placed successfully at ₹5,231,000

---

## 🔹 Summary Table

| Concept       | What It Is                | Purpose                    | Real Use                  |
| ------------- | ------------------------- | -------------------------- | ------------------------- |
| **Tools**     | Executable functions      | Do real-world actions      | API calls, DB ops, trades |
| **Resources** | Read-only data            | Provide context            | Docs, logs, configs       |
| **Prompts**   | Instruction templates     | Control model behavior     | Safety rules, roles       |
| **Sampling**  | Output randomness control | Control tone & reliability | Deterministic vs creative |

---

## ✅ One-Line Understanding

-   **Tools** → _What the AI can DO_
-   **Resources** → _What the AI can SEE_
-   **Prompts** → _How the AI should THINK_
-   **Sampling** → _How the AI should SPEAK_
