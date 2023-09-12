import React, {useEffect} from 'react';
import { loadData } from '../utils/GameLogic/StorageLogic';
import './styles.css';
import { canvasSize } from '../utils';

export let ctx : CanvasRenderingContext2D;

export const Canvas = () => {
    const canvas = React.useRef<HTMLCanvasElement | null>(null);     

    useEffect(() => {
        const _ctx = canvas.current?.getContext('2d');
        if (_ctx){
            ctx = _ctx;
            loadData();
        }
    }, [canvas])

    return (

            <canvas
            ref={canvas} height={canvasSize.height} width={canvasSize.width}/>
    );
}