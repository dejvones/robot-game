import { useState } from "react";
import { Canvas } from "../components/Canvas";
import { PlayBox } from "../components/PlayBox";
import { EditorComponent } from "../components/Editor";

export function MainPage() {
    const [status, setStatus] = useState<boolean>(false);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Canvas status={status} setStatus={setStatus}/>
            <div className="d-flex flex-column align-items-center justify-content-start">
                <PlayBox setStatus={setStatus} status={status}/>
                <EditorComponent/> 
            </div>
            
        </div>
    );
}