import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFreelanceContext } from '../../context/FreelanceContext';

export const Posts = () => {

    const {posts, onGetPosts} = useFreelanceContext();

    useEffect(() => {
        onGetPosts();
    }, [])

    function renderPosts() {
        if(posts.length === 0) return (
            <>
                <h1>No hay posts</h1>
                <Link to={'/post'}>Crear post</Link>
            </>
        )
        return (
            <>
                {posts.map(post =>
                <div key={post.post_id} className="post-container">
                    <div className="post-info-preview">
                        <p className="color-uno">{post.user_name}</p>
                        <p className="color-dos">{post.post_at}</p>
                    </div>
                    <div className="post-header-preview">
                        <p className="color-uno">{post.post_title}</p>
                    </div>
                    <div className="post-footer-preview">
                        <Link to={`/post/${post.user_name}/${post.post_id}`}>Ver publicación</Link>
                    </div>
                </div>
                )}
                {
                    sessionStorage.getItem('token')
                    ? 
                        <Link to={'/post'}>Crear post</Link> 
                    : 
                        <>
                            <span>Para poder crear una publicación, debes </span><Link to={'/login'}>Iniciar sesión</Link>
                        </>
                }
            </> // 
        )
        
    }

    return renderPosts();
}
