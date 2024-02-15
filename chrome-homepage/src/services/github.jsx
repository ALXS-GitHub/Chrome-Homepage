import axios from 'axios';

const getUserRepos = async (username, token) => {
    const per_page = 100;
    try {
        const response = await axios.get(`https://api.github.com/user/repos?per_page=${per_page}`, {
            headers: {
                Authorization: `token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching repos', error);
    }
}

const getLatestCommits = async (username, token) => {
    const limit=10;
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/events`, {
            headers: {
                Authorization: `token ${token}`
            }
        });
        return response.data.filter(event => event.type === 'PushEvent').slice(0, limit);
    } catch (error) {
        console.error('Error fetching commits', error);
    }
}

export { getUserRepos, getLatestCommits }
