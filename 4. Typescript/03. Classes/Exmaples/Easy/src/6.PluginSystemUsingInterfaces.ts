// Plugin interface
interface Plugins {
    name: string;
    initialize(): void;
    execute(): void;
}

// PluginManager class
class PluginManager {
    private plugins: Plugins[] = [];

    register(plugin: Plugins): void {
        console.log(`Registering plugin: ${plugin.name}`);
        this.plugins.push(plugin);
    }

    initializeAll(): void {
        console.log("Initializing all plugins...");
        for (const plugin of this.plugins) {
            plugin.initialize();
        }
    }

    runAll(): void {
        console.log("Executing all plugins...");
        for (const plugin of this.plugins) {
            plugin.execute();
        }
    }
}

// LoggerPlugin
class LoggerPlugin implements Plugins {
    name = "LoggerPlugin";

    initialize(): void {
        console.log(`[${this.name}] Logger initialized.`);
    }

    execute(): void {
        console.log(`[${this.name}] Logging data...`);
    }
}

// AuthPlugin
class AuthPlugin implements Plugins {
    name = "AuthPlugin";

    initialize(): void {
        console.log(`[${this.name}] Auth service initialized.`);
    }

    execute(): void {
        console.log(`[${this.name}] Authenticating user...`);
    }
}

// Example usage
const pluginManager = new PluginManager();

const logger = new LoggerPlugin();
const auth = new AuthPlugin();

pluginManager.register(logger);
pluginManager.register(auth);

pluginManager.initializeAll();
pluginManager.runAll();
