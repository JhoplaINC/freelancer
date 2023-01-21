import { Route, Routes } from 'react-router-dom';
import { IndexPage, Login, Register, Profile, UpdateAccount, Posts, NewPost, Post, NotFound, UpdateProfileImg } from '../pages'


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<IndexPage />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/profile/update' element={<UpdateAccount />}/>
            <Route path='/profile/update-img' element={<UpdateProfileImg />}/>
            <Route path='/posts' element={<Posts />}/>
            <Route path='/post' element={<NewPost />}/>
            <Route path='/post/:user/:post_id' element={<Post />}/>
            <Route path='/*' element={<NotFound />}/>
        </Routes>
    )
}
