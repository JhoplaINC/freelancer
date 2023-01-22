import {createContext, useContext, useState} from 'react';
import { getPostsRequest, getPostRequest, newPostRequest, newCommentRequest } from '../API/posts.api';
import { loginRequest, 
         registerRequest, 
         getProfileDataRequest, 
         updateUserAccount, 
         updateUserImg, 
         getUserImg } 
    from '../API/user.api';

export const FreelanceContext = createContext();

export const useFreelanceContext = () => {
    const context = useContext(FreelanceContext);
    if(!context) {
        throw new Error('No context');
    }
    return context;
}

export const FreelanceContextProvider = ({children}) => {

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState();

    // POST REQUESTS 

    const onGetPosts = async () => {
        const resp = await getPostsRequest();
        setPosts(resp.data);
    }

    const onGetPost = async (user, post_id) => {
        try {
            const resp = await getPostRequest(user, post_id);
            return resp.data;
        } catch (error) {
            console.log(error);
        }
    }

    const onNewPost = async (user_id, postTitle, postInfo) => {
        try {
            let localTokenStorage = sessionStorage.getItem('token');
            if(localTokenStorage){
                const newPost = await newPostRequest(user_id, postTitle, postInfo);
            } else {
                console.log('No post bruh');
            }
        } catch (error) {
            console.log(error);   
        }
    }

    const onNewComment = async (user_id, post_id, comment) => {
        try {
            const newComment = newCommentRequest(user_id, post_id, comment);
        } catch (error) {
            console.log(error);
        }
    }

    // USER REQUESTS

    const onLogin = async (email, password) => {
        try {
            const loginData = await loginRequest(email, password);
            if(loginData.data.auth === true){
                sessionStorage.setItem('token', loginData.data.token);
            } else {
                console.log(loginData.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onRegister = async (name, lastname, email, password, rol) => {
        try {
            const newUser = await registerRequest(name, lastname, email, password, rol);
        } catch (error) {
            console.log(error);
        }
    }

    const onGetUserData = async () => {
        try {
            let sessionTokenStorage = sessionStorage.getItem('token');
            if(sessionTokenStorage){
                const userData = await getProfileDataRequest();
                return userData.data[0];
            } else {
                console.log('TODO: redirect to login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onNewAccountData = async (newAccountInfo) => {
        try {
            let sessionTokenStorage = sessionStorage.getItem('token');
            if(sessionTokenStorage){
                const newUserData = await updateUserAccount(newAccountInfo);
            } else {
                console.log('al perfil');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onNewProfileImg = async (data) => {
        try {
            const newImg = await updateUserImg(data);
        } catch (error) {
            console.log(error);
        }
    }

    const onGetUserImg = async () => {
        try {
            const userImg = await getUserImg();
            const img_path = userImg.data;
            return img_path;
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <FreelanceContext.Provider value={
            {
                onGetPosts, 
                onGetPost, 
                onNewPost,
                onNewComment,
                posts, 
                onLogin, 
                onRegister, 
                onGetUserData,
                onNewAccountData,
                onNewProfileImg,
                onGetUserImg,
                user
            }
        }>
            {children}
        </FreelanceContext.Provider>
    )
}