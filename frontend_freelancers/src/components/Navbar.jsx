import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
    
    const navigate = useNavigate();

    function onDeleteSession() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user_nick');
        navigate('login');
    }

    return (
        <>
            <nav>
                <li>
                    <Link to={'/'}>Inicio</Link>
                </li>
                <li>
                    <Link to={'/posts'}>Posts</Link>
                </li>
            {sessionStorage.getItem('token') ? 
            <>
                <li>
                    <Link to={'/profile'}>Perfil</Link>
                </li>
                <li>
                    <button onClick={() => onDeleteSession()}>
                        Logout
                    </button>
                </li>
            </>
            :
            <>
                <li>
                    <Link to={'/login'}>Login</Link>
                </li>
                <li>
                    <Link to={'/register'}>Register</Link>
                </li>   
            </>
            }
            </nav>
        </>
    )
}
