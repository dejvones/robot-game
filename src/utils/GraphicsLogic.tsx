import { ctx } from "../components/Canvas";
import { Graphic } from "../models/Graphic";
import { BoundingRect, IGraphic, Position, Size } from "../domains/IGraphic";
import { Wall } from "../models/Wall";
import { canvasSize, graphics } from ".";

export function getBoundingRect(position : Position, size: Size) : BoundingRect{
    return {
        x1: position.x, 
        x2: position.x + size.width, 
        y1: position.y, 
        y2: position.y + size.height};
}

export function detectGraphic(position : Position) : IGraphic | undefined {
    return graphics.find(g => 
        (g.boundingRect.x1 <= position.x && position.x <= g.boundingRect.x2) && 
        (g.boundingRect.y1 <= position.y && position.y <= g.boundingRect.y2))
}

export function createBarrier() : Graphic[]{
    return [
        new Wall({x: -1, y: 0}, {width: 1, height: canvasSize.height}),
        new Wall({x: 0, y: -1}, {width: canvasSize.width, height: 1}),
        new Wall({x: canvasSize.width + 1, y : 0}, {width: 1, height: canvasSize.height}),
        new Wall({x: 0, y: canvasSize.height + 1}, {width: canvasSize.width, height: 1})
    ];
}

export function redraw(){
    if (ctx){
        ctx.clearRect(0,0,canvasSize.width, canvasSize.height);
        graphics.forEach(g => g.draw())
    }
}