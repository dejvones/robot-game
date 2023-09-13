import { IGraphicSave } from "./IGraphic"

export interface ILevels{
    name: string,
    levels: ILevel[]
}

export interface ILevel{
    graphics: IGraphicSave[]
}