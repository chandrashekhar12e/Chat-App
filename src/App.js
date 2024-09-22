import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import MainContainer from './Components/MainContainer';
import Welcome from './Components/Welcome';
import ChatArea from './Components/ChatArea';
import Users from './Components/Users';
import CreateGroups from './Components/CreateGroups';
import Groups from './Components/Groups';
import Conversation from './Components/Conversation.js'
import { useSelector } from 'react-redux';

function App() {
  const isLight= useSelector((state)=>state.themeKey)
  

  return (
    <div className={"App" + (isLight ?"" : " AppDark")}>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path="app" element={<MainContainer/>}>
          <Route path='welcome' element={<Welcome/>}/>
          <Route path='chat/:_id' element={<ChatArea />}/>
          <Route path='users' element={<Users/>}/>
          <Route path='groups' element={<Groups/>}/>
          <Route path='create-groups' element={<CreateGroups/>}/>
          <Route path='conversation' element={<Conversation/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
