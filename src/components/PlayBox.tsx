import { FaPlay, FaStop } from 'react-icons/fa';

interface playBoxProps {
    setStatus(_ : boolean) : void,
    status : boolean,
}

export const PlayBox = ({setStatus, status} : playBoxProps) => {
    return (
        <div className='d-flex flex-column align-items-center'>
            <h5 className={status ? 'text-success' : 'text-danger'}>Simulation: {status ? 'ON' : 'OFF'}</h5>
            <div className='btn-group' role='group'>
                <button type='button' className='p-3 btn btn-success' onClick={() => {setStatus(true)}}>
                <FaPlay size={25}/>
                </button>
                <button type='button' className='p-3 btn btn-danger' onClick={() => {setStatus(false)}}>
                <FaStop size={25}/>
                </button>
            </div>
        </div>
        
    )
}