import { useState, useEffect } from 'react';
import { useFreelanceContext } from "../../context/FreelanceContext"
import { Link } from 'react-router-dom';

export const Profile = () => {

    const {onGetUserData, onGetUserImg} = useFreelanceContext();

    const [userData, setUserData] = useState({
        name: '',
        secondName: '',
        lastname: '',
        secondLastName: '',
        email: '',
        rol: '',
        img: ''
    });

    useEffect(() => {
        const getUser = async () => {
            const userData = await onGetUserData();
            const img_path = await onGetUserImg();
            setUserData({
                name: userData.user_name,
                secondName: userData.user_second_name,
                lastname: userData.user_lastname,
                secondLastName: userData.user_second_lastname,
                email: userData.user_email,
                rol: userData.rol_name,
                img: userData.user_profile_img_path
            });
            console.log(userData.user_profile_img_path);
            return userData;
        }
        getUser();
    }, [])

    return (
        <>
            <h1>{userData.name}</h1>
            <img src={userData.img} alt="Profile img" />
            <Link to={'/profile/update'}>Actualizar datos del perfil</Link>
            <Link to={'/profile/update-img'}>Actualizar foto de perfil</Link>
        </>
    )
}
