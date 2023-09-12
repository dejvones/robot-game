import { graphics, setGraphics } from "..";
import { Finish } from "../../models/Finish";
import { Robot } from "../../models/Robot";
import { Wall } from "../../models/Wall";
import { redraw } from "../GraphicsLogic";
import { Success } from "../Messages";

let simulation : NodeJS.Timeout;

export function runSimulation(): void {
    const finishes = graphics.filter(g => g instanceof Finish) as Finish[];
    const walls = graphics.filter(g => g instanceof Wall) as Wall[];

    simulation = setInterval(function() {
        if (isAllDone()){
            Success('Všichni roboti dotazili do cíle.');
            clearInterval(simulation);
        }
        else {
            simulateStep(finishes, walls);
            redraw();
        }
    }, 25)
}

export function stopSimulation(): void {
    clearInterval(simulation);
    redraw();
}

function simulateStep(finishes : Finish[], walls : Wall[]) : void{
    const actualRobots = graphics.filter(g => g instanceof Robot) as Robot[];
    actualRobots.forEach(r => graphics.splice(graphics.indexOf(r), 1));

    const nextRobots = actualRobots.map(r => r.isInFinish(finishes) ? r : r.move(walls));
    setGraphics([...graphics, ...nextRobots]);
}

function isAllDone() : boolean {
    const robots = graphics.filter(g => g instanceof Robot) as Robot[];
    const finishes = graphics.filter(g => g instanceof Finish) as Finish[];
    return robots.every(r => r.isInFinish(finishes));
}