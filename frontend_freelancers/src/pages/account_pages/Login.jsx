import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFreelanceContext } from '../../context/FreelanceContext';

export const Login = () => {

    const { onLogin } = useFreelanceContext();

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();    

    return (
        <Formik
            initialValues={user}
            enableReinitialize={true}
            onSubmit={async (values, actions) => {
                await onLogin(values);
                setUser({
                    email: '',
                    password: ''
                });
                navigate('/profile');
            }}
        >
            {({handleChange, handleSubmit, values, isSubmiting}) => (
            <Form onSubmit={handleSubmit}>
                <p>Iniciar sesión</p>
                <ul>
                    <li>
                        <label>email</label>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="Ingrese su email"
                            onChange={handleChange}
                            value={values.email}
                        />
                    </li>
                    <li>
                        <label>password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Ingrese su contraseña"
                            onChange={handleChange}
                            value={values.password}
                        />
                    </li>
                    <li>
                        <input 
                            type="submit" 
                            disabled={isSubmiting}
                            value={isSubmiting ? 'Iniciando sesión': 'Iniciar sesión'} 
                        />
                    </li>
                </ul>
                <p>No tienes una cuenta? <Link to={'/register'}>Registrate</Link></p>
            </Form>
            )}
        </Formik>
    )
}
