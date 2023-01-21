import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFreelanceContext } from '../../context/FreelanceContext';

export const UpdateAccount = () => {

    const {onGetUserData, onNewAccountData} = useFreelanceContext();
    const [userData, setUserData] = useState({
        user_second_name: '',
        user_second_lastname: '',
        user_nick: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserData = async () => {
            const user = await onGetUserData();
            setUserData({
                user_second_name: user.user_second_name,
                user_second_lastname: user.user_second_lastname,
                user_nick: user.user_nick
            });
        }
        loadUserData();
    }, [])

    return (
        <Formik
            initialValues={userData}
            enableReinitialize={true}
            onSubmit={async (values, actions) => {
                await onNewAccountData(values);
                navigate('/profile');
                setUserData({
                    second_name: '',
                    second_lastname: '',
                    nick: ''
                });
            }}
        >
        {({handleChange, handleSubmit, values, isSubmitting}) => (
            <Form onSubmit={handleSubmit}>
                <p>Editar información de la cuenta</p>
                <ul>
                    <li>
                        <label>Segundo nombre</label>
                        <input 
                            type="text" 
                            name="user_second_name" 
                            placeholder="segundo nombre" 
                            onChange={handleChange}
                            value={values.user_second_name}
                        />
                    </li>
                    <li>
                        <label>Segundo nombre</label>
                        <input 
                            type="text" 
                            name="user_second_lastname" 
                            placeholder="segundo apellido" 
                            onChange={handleChange}
                            value={values.user_second_lastname}
                        />
                    </li>
                    <li>
                        <label>Segundo nombre</label>
                        <input 
                            type="text" 
                            name="user_nick" 
                            placeholder="nick" 
                            onChange={handleChange}
                            value={values.user_nick}
                        />
                    </li>
                    <li>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Actualizando cuenta" : "Actualizar cuenta"}
                        </button>
                    </li>
                </ul>
            </Form>
        )}
        </Formik>
    )

}
