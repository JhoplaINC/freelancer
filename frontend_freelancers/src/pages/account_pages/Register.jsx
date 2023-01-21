import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useFreelanceContext } from '../../context/FreelanceContext';

export const Register = () => {

    const { onRegister } = useFreelanceContext();

    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{
                name: '',
                lastname: '',
                email: '',
                rol: 0,
                password: ''
            }}
            enableReinitialize={true}
            onSubmit={async (values, actions) => {
                if(values.rol === 0) return console.log('imposible');
                await onRegister(values);
                navigate('/login');
            }}
        >
            {({handleChange, handleSubmit, values, isSubmiting}) => (
            <Form onSubmit={handleSubmit}>
                <p>Registrar</p>
                <ul>
                    <li>
                        <label>Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Ingresa tu nombre"
                            required
                            onChange={handleChange}
                            value={values.name}
                        />
                    </li>
                    <li>
                        <label>Lastname</label>
                        <input 
                            type="text" 
                            name="lastname" 
                            placeholder="Ingresa tu apellido"
                            required
                            onChange={handleChange}
                            value={values.lastname}
                        />
                    </li>
                    <li>
                        <label>Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="Ingrese su email"
                            required
                            onChange={handleChange}
                            value={values.email}
                        />
                    </li>
                    <li>
                        <label>Rol</label>
                        <select name="rol" onChange={handleChange} value={values.rol} required>
                            <option value="0">Ingrese su rol</option>
                            <option value="1">Desarrollador</option>
                            <option value="2">Empresa</option>
                        </select>
                    </li>
                    <li>
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Ingrese su contraseña"
                            required
                            onChange={handleChange}
                            value={values.password}
                        />
                    </li>
                    <li>
                        <input
                            type="submit" 
                            disabled={isSubmiting}
                            value={isSubmiting ? 'Registrando': 'Registrarse'} 
                        />
                    </li>
                </ul>
                <p>Ya tienes una cuenta? <Link to={'/login'}>Inicia sesión</Link></p>
            </Form>
            )}
        </Formik>
    )
}
