import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import '../Chat/Chat.css';
import Messages from '../Messages/Messages';
import Infobar from '../Infobar/Infobar';
import Input from '../Input/Input';

const ENDPOINT = 'https://react-node-text-chat.herokuapp.com/';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    
    
    

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        var connectionOptions =  {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        };

        socket = io(ENDPOINT, connectionOptions);

        setName(name);
        setRoom(room);

        console.log(name, room);

        console.log(socket);

        socket.emit('join', { name, room }, (error) => {
            if(error) {
                alert(error); 
            }
        });
        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <Infobar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            
        </div>
    )
}

export default Chat; 