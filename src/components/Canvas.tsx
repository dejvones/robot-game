import React, {useEffect} from 'react';
import { redraw } from '../utils/GraphicsLogic';
import { Graphic } from '../models/Graphic';
import { Success, Warning } from '../utils/Messages';
import { isAllDone, simulateStep, someCollision } from '../utils/SimulateLogic';
import { loadData } from '../utils/StorageLogic';
import './styles.css';

interface canvasProps {
    status: boolean,
    setStatus(_ : boolean) : void
}


export const canvasSize = {
    width: 1200,
    height: 800
}

export let ctx : CanvasRenderingContext2D;

export let graphics : Graphic[] = [];
export function setGraphics(g : Graphic[]){
    graphics = g;
}

let playStatus = false;

export const Canvas = ({status, setStatus} : canvasProps) => {
    const canvas = React.useRef<HTMLCanvasElement | null>(null);     

    useEffect(() => {
        const _ctx = canvas.current?.getContext('2d');
        if (_ctx){
            ctx = _ctx;
            loadData();
        }
    }, [canvas])
    
    useEffect(() => {
        playStatus = status;
        if (playStatus){
            simulate();
        }
    // eslint-disable-next-line
    }, [status])


    async function simulate(){
        if (someCollision()){
            Warning('Výchozí pozice robota koliduje se zdí.');
        }
        while (!isAllDone() && playStatus){
            graphics = simulateStep();
            redraw();
            await new Promise(res => setTimeout(res, 25));
        }
        //finished
        if (isAllDone()){
            setStatus(false);
            Success('Všichni roboti dotazili do cíle.')
        }
    }

    return (

            <canvas
            ref={canvas} height={canvasSize.height} width={canvasSize.width}/>
    );
}