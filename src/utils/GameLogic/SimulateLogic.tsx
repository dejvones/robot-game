import { graphics, setGraphics } from "..";
import { Finish } from "../../models/Finish";
import { Robot } from "../../models/Robot";
import { Wall } from "../../models/Wall";
import { redraw } from "../GraphicsLogic";
import { Error, Success } from "../Messages";

let simulation : NodeJS.Timeout;
let timeout : NodeJS.Timeout;

export function runSimulation(stopCallback: () => void): void {
    const finishes = graphics.filter(g => g instanceof Finish) as Finish[];
    const walls = graphics.filter(g => g instanceof Wall) as Wall[];

    timeout = setTimeout(function() {
        Error('The journey took too long');
        stopSimulation();
        stopCallback();
    }, 60000);

    simulation = setInterval(function() {
        if (isAllDone(finishes)){
            clearTimeout(timeout);
            clearInterval(simulation);
            Success('Level successfully completed');
            stopCallback();
        }
        else {
            simulateStep(finishes, walls);
            redraw();
        }
    }, 25)
}

export function stopSimulation(): void {
    const nextGraphics = graphics.map(graphic => {
        if (graphic instanceof Robot){
            const robot = graphic as Robot;
            robot.resetPosition();
            return robot;
        }
        return graphic;
    })
    setGraphics(nextGraphics);

    clearTimeout(timeout);
    clearInterval(simulation);
    redraw();
}

function simulateStep(finishes : Finish[], walls : Wall[]) : void{
    const nextGraphics = graphics.map(graphic => {
        if (graphic instanceof Robot){
            const robot = graphic as Robot;
            return robot.isInFinish(finishes) ? robot : robot.move(walls);
        }
        return graphic;
    })

    setGraphics(nextGraphics);
}

function isAllDone(finishes : Finish[]) : boolean {
    return (graphics.filter(g => g instanceof Robot) as Robot[]).some(r => r.isInFinish(finishes));
}