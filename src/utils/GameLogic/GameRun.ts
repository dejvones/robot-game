import { editorInput, graphics } from "..";
import { Robot } from "../../models/Robot";
import { parseInput } from "./CommandsLogic";
import { Error } from "../Messages";
import { runSimulation, stopSimulation } from "./SimulateLogic";

export function start(stopCallback : () => void): void {
    if(!setCommandsIsOk()){
        Error('Invalid commands for robot');
        stopCallback();
        return;
    }
    runSimulation(stopCallback);
    return;
}

export function stop(): void{
    stopSimulation();
}

function setCommandsIsOk() : boolean {
    const commands = parseInput(editorInput);
    if (!commands) return false;

    const actualRobots = graphics.filter(g => g instanceof Robot) as Robot[];
    actualRobots.forEach(robot => robot.setMovement(commands));
    return true;
}