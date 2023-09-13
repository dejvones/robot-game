import { useEffect, useState } from "react";
import { loadLevels } from "../utils/GameLogic/StorageLogic";
import { ILevel, ILevels } from "../domains/ILevel";
import './styles.css'
import { Level } from "./LevelPage";

export function MainPage() {
    const [levels, setLevels] = useState<ILevels[]>([]);
    const [currentLevel, setCurrentLevel] = useState<ILevel | undefined>(undefined);

    useEffect(() => {
        loadLevels(setData);
    }, []);

    function setData(levels: ILevels[]) : void {
        setLevels(levels);
    }

    function goBack(): void {
        setCurrentLevel(undefined);
    }
    
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            {
                currentLevel ? 
                    <Level levelData={currentLevel} goBack={goBack}/> 
                    :
                levels.map((level, i) => 
                    <div className="levelGroup card" key={i}>
                        <h3>{level.name}</h3>
                        <div>
                            {level.levels.map((content, index) => 
                                <div className="card" key={index}> 
                                    <h5>Level {index+1}</h5>
                                        <button className="btn btn-success" onClick={() => setCurrentLevel(content)}>
                                            Play!
                                        </button>  
                                </div>
                                  
                            )}
                        </div>
                    </div>
            )
            }
            
        </div>
    );
}