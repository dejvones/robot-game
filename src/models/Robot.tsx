import { getBoundingRect } from "../utils/GraphicsLogic";
import { Graphic } from "./Graphic";
import { Position } from "./IGraphic";
import { Wall } from "./Wall";
import { Directions, GraphicType } from "./enums";


interface Movement {
    curDirection: Directions,
    dx: number,
    dy: number
}

const Movements = {
    [Directions.Up] : {curDirection: Directions.Up, dx: 0, dy: -2},
    [Directions.Right]: {curDirection: Directions.Right, dx: 2, dy: 0},
    [Directions.Down]: {curDirection: Directions.Down, dx: 0, dy: 2},
    [Directions.Left]: {curDirection: Directions.Left, dx: -2, dy: 0}
}

export class Robot extends Graphic {
    image : HTMLImageElement;
    movement : Movement;

    /**
     * Vytvoří grafiku, které nastaví výchozí hodnoty velikosti a přednačte si obrázek, který zobrazuje robota. Následně grafiku i vykreslí
     * @constructs
     * @param position {Position} Pozice kam vložit grafiku
     * @param ctx {CanvasRenderingContext2D} Kontext plátna pro vykreslení
     * @param moveType {MovementType} Způsb pohybu robota
     * 
     * @category Models
     * @extends Graphic
     * @classdesc Grafika znázorňující cíl
     * 
     * @property {HTMLImageElement} image Obrázek robota
     * @property {Movement} movement Druh pohybu
     */
    constructor(position : Position, ctx : CanvasRenderingContext2D){
        super(position, {width: 32, height: 32}, GraphicType.Robot, ctx);
        const image = new Image();
        image.src = "/assets/robot.png";
        image.onload = function () {
            ctx.drawImage(image, position.x, position.y);
        }
        this.image = image;

        this.movement = Movements[Directions.Up];
    }

    /**
     * Nakreslí robota na plátno
     * @returns {void}
     */
    draw(){
        if (!this.ctx) return;
        this.ctx.drawImage(this.image, this.position.x, this.position.y);
    }
    
    
    /**
     * Otočí robota o 90 stupňů doprava
     * @returns {void}
     */
    rightHandMove() {
        switch (this.movement.curDirection) {
            case Directions.Up:
                this.movement = {...this.movement, ...Movements[Directions.Right]};
                break;
            case Directions.Right:
                this.movement = {...this.movement, ...Movements[Directions.Down]};
                break;
            case Directions.Down:
                this.movement = {...this.movement, ...Movements[Directions.Left]};
                break;
            case Directions.Left:
                this.movement = {...this.movement, ...Movements[Directions.Up]};
                break;
        }
    }

    /**
     * Provede posun daného robota podle jeho směru pohybu, v případě kolize změní směr dle vybrané strategie
     * @param {Wall[]} walls Seznam zdí na mapě
     * @returns {Robot} Robot s novou pozicí
     */
    move(walls : Wall[]) : Robot {
        let newRobot = {...this, position : {x: this.position.x + this.movement.dx, y: this.position.y + this.movement.dy}};
        newRobot.boundingRect = getBoundingRect(newRobot.position, newRobot.size);
        //pokud nastane kolize, tak ho nemenim
        if (walls.some(w => this.isCollision(w,newRobot))){
            this.rightHandMove(); 
            return this;
        }
        //pokus nenastane kolize, tak ho menim
        this.position = newRobot.position;
        this.recalculateBoundingRect();
        return this;
    }

    /**
     * Nastaví nový směr robota
     * @param {Directions} direction Nový směr 
     * @returns {void}
     */
    setDirection(direction: Directions) {
        this.movement.curDirection = direction;
        this.movement = {...this.movement, ...Movements[direction]};
    }

    isInFinish(finishes : Graphic[]) : boolean{
        return finishes.some(f => f.position.x === this.position.x && f.position.y === this.position.y);
    }


    isCollision(graphic2 : Graphic, graphic1 : Robot = this){
        return !((graphic1.boundingRect.y2 < graphic2.boundingRect.y1) ||
                (graphic1.boundingRect.y1 > graphic2.boundingRect.y2) ||
                (graphic1.boundingRect.x2 < graphic2.boundingRect.x1) ||
                (graphic1.boundingRect.x1 > graphic2.boundingRect.x2));
    }
}