import axios from 'axios';

export const getPostsRequest = async () =>
    await axios.get('http://localhost:4000/posts');

export const getPostRequest = async (user, post_id) =>
    await axios.get(`http://localhost:4000/post/${user}/${post_id}`);

export const newPostRequest = async (user_id, postTitle, postInfo) =>
    await axios.post(`http://localhost:4000/newpost`, [{user_id, postTitle, postInfo}]);
