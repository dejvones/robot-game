import { FaPlay, FaStop } from 'react-icons/fa';
import { GameStatus } from '../domains';

interface playBoxProps {
    setStatus(_ : GameStatus) : void,
    status : GameStatus,
}

export const PlayBox = ({setStatus, status} : playBoxProps) => {
    return (
            <div className='btn-group' role='group'>
                <button type='button' className='p-3 btn btn-success' onClick={() => {setStatus(GameStatus.Running)}} disabled={status === GameStatus.Running}>
                <FaPlay size={25}/>
                </button>
                <button type='button' className='p-3 btn btn-danger' onClick={() => {setStatus(GameStatus.Stopped)}} disabled={status === GameStatus.Stopped}>
                <FaStop size={25}/>
                </button>
            </div>        
    )
}