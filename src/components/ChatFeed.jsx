import React from 'react'
import { useState } from "react";
import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";

export const ChatFeed = (props) => {
    const [user, setUser] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogout = () => {
        setUser({});
        setUsername("");
        setPassword("");
        localStorage.clear();
      };

    const {chats, activeChat, userName, messages } = props;

    const chat= chats && chats[activeChat];

    //for left side of the chat
    const renderReadReceipts = (message,isMyMessage) => {
        chat.people.map((person, index) => person.last_read === message.id &&(
            <div
            key= {`read_${index}`}
            className="read-receipt"
            style={{
                float: isMyMessage? 'right' : 'left',
                backgroundImage: `url(${person?.person?.avatar})`
            }}
                />
        ))
    }

    //for generating messages
    const renderMessages = () => {
        //fetch all messages
        const keys = Object.keys(messages); //keys are IDs of specific messages

        return keys.map((key,index) => {
            const message = messages[key];
            const lastMessageKey= index === 0 ? null:keys[index -1] ;  //to know if it is the last message(check if index==0)
            const isMyMessage= userName === message.sender.username;     //to know if it is myMessage

            return (
                <div key={`msg_${index}`} style={{width: '100%'}}>
                    <div className="message-block">
                        {
                            isMyMessage
                            ? <MyMessage message={message}/>
                            : <TheirMessage message={message} lastMessage= {messages[lastMessageKey]} />
                        }
                    </div>
                    <div className= "read-receipts" style= {{marginRight: isMyMessage ? '18px' : '0px', marginLeft :isMyMessage ? '0px' : '68px'}}>
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div>
            )

        })
    }

    //if we dont have any chat
    if(!chat) return "Loading...";

    return (
        <div className="chat-feed">
            <div className="chat-title-container">

                <div className="chat-title">{chat.title}</div> 

                <form>
                <button className="logout" onClick={handleLogout}>Logout</button>
                </form>
                
                </div>
                <div className="chat-subtitle">
                    {chat.people.map((person) => ` ${person.person.username} `)}
                </div>
            

            {/* call render messages */}
            {renderMessages()}

            {/* for spacing..self closing div */}
            <div style={ { height: '100px'}}/>  

            <div className="message-form-container">
                <MessageForm {...props} chatId={activeChat} />
            </div>

            

            
        </div>
    )
}

export default ChatFeed