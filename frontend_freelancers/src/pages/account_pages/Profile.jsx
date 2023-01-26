import { useState, useEffect } from 'react';
import { useFreelanceContext } from "../../context/FreelanceContext"
import { Link, useParams } from 'react-router-dom';

export const Profile = () => {

    const {onFollowUser, onGetUserData, onGetThirdUserData } = useFreelanceContext();
    const params = useParams();

    const [userData, setUserData] = useState({
        id: '',
        name: '',
        secondName: '',
        lastname: '',
        secondLastName: '',
        email: '',
        rol: '',
        img: ''
    });

    let ownProfile = false;
    const sessionNick = sessionStorage.getItem('user_nick');
    
    if(params.user_nick) ownProfile = false;
    if(!params.user_nick) ownProfile = true;
    if(sessionNick === params.user_nick) ownProfile = true;
    
    useEffect(() => {
        const getUser = async () => {
            let userData;
            if(ownProfile) {
                userData = await onGetUserData();
            } else if(!ownProfile) {
                userData = await onGetThirdUserData(params.user_nick);
            }
            setUserData({
                id: userData.user_id,
                name: userData.user_name,
                secondName: userData.user_second_name,
                lastname: userData.user_lastname,
                secondLastName: userData.user_second_lastname,
                email: userData.user_email,
                rol: userData.rol_name,
                img: 'http://localhost:4000/' + userData.user_profile_img_filename
            });
            
            return userData;
        }
        getUser();
    }, []);

    const updateProfile = () => {
        return (
        <div>
            <Link to={'/profile/update'}>Actualizar datos del perfil</Link>
            <Link to={'/profile/update-img'}>Actualizar foto de perfil</Link>
        </div>
        )
    }

    const followUser = (followed_id) => {
        return (
            <button onClick={() => onFollowUser(followed_id)}>Seguir</button>
        )
    }
    
    return (
        <>
            <h1>{userData.name}</h1>
            <img src={userData.img} alt="Profile img" />
            {ownProfile ? updateProfile() : null}
            {!ownProfile ? followUser(userData.id) : null}
        </>
    )
}
