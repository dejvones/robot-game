import { ctx } from "../../components/Canvas";
import { redraw } from "../GraphicsLogic";
import data from '../../data/levels/01.json'
import { setGraphics } from "..";
import { GraphicType, IGraphicSave } from "../../domains";
import { Finish, Graphic, Robot, Wall } from "../../models";

export function loadData(){
    const graphicsToSave = data as IGraphicSave[];
    let finalData : Graphic[] = [];
    graphicsToSave.forEach(g => {
        switch(g.type){
            case GraphicType.Wall:
                finalData = [...finalData, new Wall(g.position, g.size ?? {width: 10, height: 10}, ctx ?? undefined)];
                break;
            case GraphicType.Finish:
                finalData = [...finalData, new Finish(g.position, ctx)];
                break;
            default:
                finalData = [...finalData, new Robot(g.position, ctx)];
                break;
        }
    })

    setGraphics(finalData)
    redraw();
}