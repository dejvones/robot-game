import { Graphic } from "./Graphic";
import { Position, Size, GraphicType } from "../domains/";

export class Wall extends Graphic {
    constructor(position : Position, size : Size, ctx: CanvasRenderingContext2D | undefined = undefined){
        super(position, size, GraphicType.Wall, ctx);
        this.draw();
    }

    draw(){
        if (!this.ctx) return;
        this.ctx.fillStyle = "#212529";
        this.ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }
}