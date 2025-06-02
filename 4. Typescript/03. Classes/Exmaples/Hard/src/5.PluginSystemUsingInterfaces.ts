interface Plugins {
    name: string;
    initialize(): void;
    execute(): void;
}

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

class LoggerPlugin implements Plugins {
    name = "LoggerPlugin";

    initialize(): void {
        console.log(`[${this.name}] Initialized logging system.`);
    }

    execute(): void {
        console.log(`[${this.name}] Writing logs...`);
    }
}

class AuthPlugin implements Plugins {
    name = "AuthPlugin";

    initialize(): void {
        console.log(`[${this.name}] Auth service initialized.`);
    }

    execute(): void {
        console.log(`[${this.name}] Authenticating user...`);
    }
}

const pluginManager = new PluginManager();

const loggers = new LoggerPlugin();
const auth = new AuthPlugin();

pluginManager.register(loggers);
pluginManager.register(auth);

pluginManager.initializeAll();
pluginManager.runAll();
