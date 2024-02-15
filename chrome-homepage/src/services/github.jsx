import axios from 'axios';

const getUserRepos = async (username, token) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Authorization: `token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching repos', error);
    }
}

export { getUserRepos }
