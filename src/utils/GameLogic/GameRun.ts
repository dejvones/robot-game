import { editorInput, graphics } from "..";
import { Robot } from "../../models/Robot";
import { parseInput } from "./CommandsLogic";
import { Error } from "../Messages";
import { runSimulation, stopSimulation } from "./SimulateLogic";

export function start(): void {
    if(!setCommandsIsOk()){
        Error('Invalid commands for robot');
        return
    }
    runSimulation();
}

export function stop(): void{
    const actualRobots = graphics.filter(g => g instanceof Robot) as Robot[];
    actualRobots.forEach(robot => robot.resetPosition());

    stopSimulation();
}

function setCommandsIsOk() : boolean {
    const commands = parseInput(editorInput);
    if (!commands) return false;

    const actualRobots = graphics.filter(g => g instanceof Robot) as Robot[];
    actualRobots.forEach(robot => robot.setMovement(commands));
    return true;
}