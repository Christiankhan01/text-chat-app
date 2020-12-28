import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (



        <div className="d-flex align-items-center flex-column justify-content-center h-100 body-color text-white">
            <div className="joinOuter">
                <div className="joinInner">
                    <h1 className=" text-center text-color heading">Join</h1>
                    <div><input placeholder="Name" className="joinInput" type="text" onChange={(e) => setName(e.target.value)} /></div>
                    <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(e) => setRoom(e.target.value)} /></div>
                    <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                        <button className="button mt-20" type="submit">Sign In</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Join; 