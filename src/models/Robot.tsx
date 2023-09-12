import { getBoundingRect } from "../utils/GraphicsLogic";
import { Graphic } from "./Graphic";
import { Position } from "../domains/IGraphic";
import { Wall } from "./Wall";
import { Directions, GraphicType, MoveCommand } from "../domains/enums";

const speed = 2;

export class Robot extends Graphic {
    image : HTMLImageElement | undefined;
    startPosition: Position;
    commands: MoveCommand[]
    direction: Directions

    constructor(position : Position, ctx : CanvasRenderingContext2D){
        super(position, {width: 50, height: 50}, GraphicType.Robot, ctx);

        this.setImage();
        this.startPosition = position;
        this.commands = [];
        this.direction = Directions.Up;
    }

    setMovement(commands : MoveCommand[]) : void {
        this.commands = commands;
    }

    resetPosition(): void {
        this.position = this.startPosition;
    }

    draw(){
        if (!this.ctx || !this.image) return;
        this.ctx.drawImage(this.image, this.position.x, this.position.y);
    }
    
    move(walls : Wall[]) : Robot {
        const nextPosition = this.newPosition();
        if (!nextPosition) return this;

        const newRobot = {...this, position : this.newPosition()};

        newRobot.boundingRect = getBoundingRect(newRobot.position, newRobot.size);
        
        if (walls.some(w => this.isCollision(w,newRobot))){
            this.turn();
            return this;
        }

        this.position = newRobot.position;
        this.recalculateBoundingRect();
        return this;
    }

    private newPosition(): Position | undefined {
        const topCommand = this.commands.at(0);
        if (topCommand === undefined || topCommand !== Number(MoveCommand.Go)) return undefined;

        let dx = 0;
        let dy = 0;
        switch(this.direction){
            case Directions.Up:
                dy = -speed;
                break;
            case Directions.Right:
                dx = speed;
                break;
            case Directions.Down:
                dy = speed;
                break;
            default:
                dx = -speed;
        }
        return {x: this.position.x + dx, y: this.position.y + dy};
    }

    private turn(): void {
        const topCommand = this.commands.pop();
        if (!topCommand) return;
        switch(topCommand){
            case MoveCommand.Left:
                this.direction = this.direction - 1;
                return;
            default:
                this.direction = this.direction + 1;
                return;
        }
    }

    isInFinish(finishes : Graphic[]) : boolean{
        return finishes.some(f => this.isCollision(f));
    }


    isCollision(graphic2 : Graphic, graphic1 : Robot = this){
        return !((graphic1.boundingRect.y2 < graphic2.boundingRect.y1) ||
                (graphic1.boundingRect.y1 > graphic2.boundingRect.y2) ||
                (graphic1.boundingRect.x2 < graphic2.boundingRect.x1) ||
                (graphic1.boundingRect.x1 > graphic2.boundingRect.x2));
    }

    private setImage(): void {
        const image = new Image();
        image.src = "/assets/robot.png";
        image.onload = () => {
            this.draw();
        }
        this.image = image;
    }
}