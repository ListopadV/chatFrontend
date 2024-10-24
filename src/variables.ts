export const url = 'https://chat-backend-vlo.vercel.app/';
const github_client_id = process.env.REACT_APP_github_client_id;
const redirectUri = process.env.REACT_APP_redirectUri
export const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${github_client_id}&redirect_uri=${redirectUri}`