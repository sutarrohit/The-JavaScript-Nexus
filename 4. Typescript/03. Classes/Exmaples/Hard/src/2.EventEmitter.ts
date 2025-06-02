class EventEmitter {
    private listeners: Map<string, Set<Function>> = new Map();

    on(event: string, callback: Function) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)?.add(callback);
    }

    off(event: string, callback: Function) {
        const callbacks = this.listeners.get(event);

        if (callbacks) {
            callbacks.delete(callback);
            if (callbacks.size === 0) this.listeners.delete(event);
        }
    }

    emit(event: string, ...args: any[]) {
        const callbacks = this.listeners.get(event);

        if (callbacks) {
            for (const cb of callbacks) {
                cb(...args);
            }
        }
    }
}

// Logger class

class Logger {
    constructor(private emitter: EventEmitter) {
        this.emitter.on("error", this.logError.bind(this));
        this.emitter.on("success", this.logSuccess.bind(this));
    }
    logError(message: string) {
        console.error("Error", message);
    }

    logSuccess(message: string) {
        console.log("Success", message);
    }
}

const emitter = new EventEmitter();
const logger = new Logger(emitter);

// Emit an error event
emitter.emit("error", "Something went wrong!");
emitter.emit("success", "Successfully logged.");
