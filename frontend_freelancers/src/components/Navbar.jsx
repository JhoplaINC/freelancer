import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
    
    const navigate = useNavigate();

    function onDeleteSession() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user_nick');
        navigate('login');
    }

    function loggedUser() {
        return (
            <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to={'/profile'}>Mi perfil</Link></li>
                <li><button className="dropdown-item" onClick={() => onDeleteSession()}>Logout</button></li>
            </ul>
        );
    }

    function notLoggedUser() {
        return (
            <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to={'/login'}>Iniciar sesión</Link></li>
                <li><Link className="dropdown-item" to={'/register'}>Registrarse</Link></li>
            </ul>
        )
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={'/'}>Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/posts'}>Publicaciones</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Perfil
                                </a>
                                {sessionStorage.getItem('token') ? loggedUser() : notLoggedUser()}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
