import { FC, useEffect } from 'react';
import axios from 'axios'
import {NavigateFunction, useNavigate} from "react-router-dom";
import { url } from '../../variables'

const GitHubCallback: FC = () => {

    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    console.log(code);

    if (code) {
     try {
          axios
        .post(`${url}/users/callback`, { code })
        .then(response => {
          const token = response.data.access_token;
          navigate('/chats');
        })
        .catch(error => {
          console.error('Error fetching access token:', error);
        });
     } catch (e){
         console.error("Error authenticating user: ",e);
     }
    }
  }, [navigate]);

    return (
        <div>Loading </div>
    )
}

export default GitHubCallback;