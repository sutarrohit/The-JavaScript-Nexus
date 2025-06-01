interface Vehicle {
    start(): void;
    stop(): void;
}

class car implements Vehicle {
    start() {
        console.log("--- Vehicle is started ----");
    }
    stop() {
        console.log("--- vehicle is stopped ----");
    }
}

const vehicleObj = new car();
vehicleObj.start();
vehicleObj.stop();
