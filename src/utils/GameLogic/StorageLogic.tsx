import { ctx } from "../../components/Canvas";
import { redraw } from "../GraphicsLogic";
import { setGraphics } from "..";
import { GraphicType, IGraphicSave } from "../../domains";
import { Finish, Graphic, Robot, Wall } from "../../models";
import { ILevel, ILevels } from "../../domains/ILevel";

export function loadData(data : ILevel) : void{
    const graphicsToSave = data.graphics as IGraphicSave[];
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


export function loadLevels(setLevels: (data : ILevels[]) => void) : void {
    getData().then(rawData => {
        setLevels(rawData as ILevels[]);
    });
}

function getData(): Promise<object[]> {
    return fetch('/levels/index.json')
    .then(response => 
        response.json()
            .then(data => getFiles(data.files)));
}

function getFiles(files : string[]): Promise<object[]> {
    const promises = files.map(file => 
        fetch(`/levels/${file}`)
            .then(response => {
                if (!response.ok)
                    throw new Error(`Error fetching file ${file}`);
                return response.json()
            })
            .catch(error => {
                throw new Error(`Error fetching file ${file}, ${error}`)
            })
    );

    return Promise.all(promises);
}