import './App.css';
import {ChatEngine} from "react-chat-engine";
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';

export const App = () => {

  //if there is no user return to login form
  if(!localStorage.getItem('username')) return <LoginForm/>

  return (
   <ChatEngine
        height= "100vh"
        projectID="1442afdf-3f31-4976-b77c-36e41c8d737d"
        userName={localStorage.getItem('username')}
        userSecret={localStorage.getItem('password')}
        renderChatFeed={(chatAppProps) => 
        <ChatFeed {... chatAppProps} />}


   />
  );
}

export default App;
