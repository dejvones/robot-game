import { useState } from "react";
import { Canvas } from "../components/Canvas";
import { PlayBox } from "../components/PlayBox";
import { EditorComponent } from "../components/Editor";
import { GameStatus } from "../domains";
import { start, stop } from "../utils/";

export function MainPage() {
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Stopped);

    function statusChanged(newStatus: GameStatus): void {
        setGameStatus(newStatus);
        if (newStatus === GameStatus.Running){
            start(stopSimulation);
        }
        else {
            stop();
        }
    }

    function stopSimulation(): void {
        setGameStatus(GameStatus.Stopped);
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Canvas/>
            <div className="d-flex flex-column align-items-center justify-content-start">
                <PlayBox setStatus={statusChanged} status={gameStatus}/>
                <EditorComponent status={gameStatus}/> 
            </div>
            
        </div>
    );
}