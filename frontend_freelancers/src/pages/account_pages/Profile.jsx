import { useState, useEffect } from 'react';
import { useFreelanceContext } from "../../context/FreelanceContext"
import { Link, useParams } from 'react-router-dom';

export const Profile = () => {

    const { isFollowing, followUser, onGetUserData, onGetThirdUserData } = useFreelanceContext();
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

    const [userIsFollow, setUserIsFollow] = useState([])

    let ownProfile;
    const sessionNick = sessionStorage.getItem('user_nick');
    
    if(sessionNick == params.user_nick || params.user_nick === undefined) {
        ownProfile = true;
    } else {
        ownProfile = false;
    }
    
    useEffect(() => {
        const getUser = async () => {
            let userData;
            let laData;
            if(ownProfile) {
                userData = await onGetUserData();
            } else if(!ownProfile) {
                userData = await onGetThirdUserData(params.user_nick);
                const isFollow = await isFollowing(userData.user_id);
                isFollow ? laData = 'Siguiendo' : laData = 'Seguir';
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
            
            setUserIsFollow([laData]);
            
            return userData;
        }
        getUser();
    }, [params.user_nick]);

    const updateProfile = () => {
        return (
        <div>
            <Link to={'/profile/update'}>Actualizar datos del perfil</Link>
            <Link to={'/profile/update-img'}>Actualizar foto de perfil</Link>
        </div>
        )
    }

    const onFollowUser = async (followed_id) => {
        try {
            const resp = await followUser(followed_id);
            resp.data.affectedRows == 1 ? setUserIsFollow(['Siguiendo']) : null;
        } catch (error) {
            console.log(error)
        }
    }

    const theFollowUser = (followed_id) => {
        return (
            <button onClick={() => onFollowUser(followed_id)}>Seguir</button>
        )
    }
    
    return (
        <>
            <h1>{userData.name}</h1>
            <p>{userData.secondName}</p>
            <img src={userData.img} alt="Profile img" />
            {ownProfile ? updateProfile() : null}
            {!ownProfile ? userIsFollow[0] == 'Seguir' ? theFollowUser(userData.id) : <p>{userIsFollow[0]}</p> : null}
        </>
    )
}
