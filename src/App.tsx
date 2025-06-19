import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Login} from "./pages/Login";
import {Registration} from "./pages/Registration";
import Chat from "./pages/Chats";
import GitHubCallback from "./components/Authentication/GitHubCallback";
import {CurrentChat} from "./components/ChatComponents/CurrentChat";
import Landing from "./pages/Landing";

function App() {
  return (
      <Routes>
                <Route path={"/login"} element={<Login />}></Route>
                <Route path={"/registration"} element={<Registration />}></Route>
                <Route path={"/chats"} element={<Chat />}></Route>
                <Route path={"/callback"} element={<GitHubCallback />}></Route>
                <Route path={"/chat"} element={<CurrentChat />}></Route>
                <Route path={"/"} element={<Landing />}></Route>
            </Routes>
  );
}

export default App;
