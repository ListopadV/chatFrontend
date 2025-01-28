export const url = 'https://chatbackend-2-a0ju.onrender.com';
// export const url = 'http://localhost:5000'
const github_client_id = process.env.REACT_APP_github_client_id;
const redirectUri = process.env.REACT_APP_redirectUri
export const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${github_client_id}&redirect_uri=${redirectUri}`