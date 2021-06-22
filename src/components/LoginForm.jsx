import { useState } from "react";
import axios from 'axios';

const LoginForm =() => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit= async (e) => {
        e.preventDefault();
        
        const authObject ={'Project-ID': "1442afdf-3f31-4976-b77c-36e41c8d737d", 'User-Name': username, "User-Secret": password };

        try{
            //username password => chatengine -> give message
            await axios.get('https://api.chatengine.io/chats', {headers: authObject });

            //if it works -> logged in

            //store details in local storage
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            window.location.reload();
        } 
        catch(error) {
            //if not -> try again
            setError('Oops! Incorrect credentials.')
        }
    }

    return(
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Chat Application </h1>
                <form onSubmit={handleSubmit}>
                    <input type= "text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Enter Username" required />
                    <input type= "password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Enter Password" required />

                    <div align="center">
                        <button type="submit" className="button">
                                <span> Start Chatting </span>
                        </button>
                    </div>

                <h2 className="error">{error}</h2>
                </form>
            </div>
        </div>
    )


}
export default LoginForm