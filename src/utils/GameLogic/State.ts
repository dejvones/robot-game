import { GameStatus, IGraphic } from "../../domains";

export let graphics: IGraphic[] = [];
export let editorInput: string = '';

export function setGraphics(data: IGraphic[]): void{
    graphics = data;
}

export function setEditorInput(data : string): void{
    editorInput = data;
}