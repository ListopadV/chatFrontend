import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import {Login} from "./pages/Login";
import {Registration} from "./pages/Registration";
import Chat from "./pages/Chats";
import GitHubCallback from "./components/Authentication/GitHubCallback";
import { CurrentChat } from './components/Chats/CurrentChat';
import Home from './components/Home/Home';

const Tree: FC = () => {

    return (
            <Routes>
                <Route path={"/login"} element={<Login />}></Route>
                <Route path={"/registration"} element={<Registration />}></Route>
                <Route path={"/chats"} element={<Chat />}></Route>
                <Route path={"/callback"} element={<GitHubCallback />}></Route>
                <Route path={"/chat"} element={<CurrentChat />}></Route>
                <Route path={"/"} element={<Home />}></Route>
            </Routes>
    )
}

export default Tree;
