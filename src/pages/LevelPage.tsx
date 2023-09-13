import { useEffect, useState } from "react";
import { Canvas } from "../components/Canvas";
import { PlayBox } from "../components/PlayBox";
import { EditorComponent } from "../components/Editor";
import { GameStatus } from "../domains";
import { start, stop } from "../utils";
import { ILevel } from "../domains/ILevel";
import { loadData } from "../utils/GameLogic/StorageLogic";

interface props {
    levelData: ILevel,
    goBack: () => void
}

export function Level({levelData, goBack} : props) {
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Stopped);

    useEffect(() => {
        loadData(levelData);
    }, []);

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
                <PlayBox setStatus={statusChanged} status={gameStatus} goBack={goBack}/>
                <EditorComponent status={gameStatus}/> 
            </div>
            
        </div>
    );
}