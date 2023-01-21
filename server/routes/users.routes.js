import express from 'express';
import { Router} from 'express';
import multer from 'multer';
import { verifyToken } from '../controllers/verifyToken.js';
import { registerRequest, 
         loginRequest, 
         userProfile, 
         updateProfile, 
         updateUserImg, 
         getUserProfileImg}
    from '../controllers/accountController.js';

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/../../public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage});

router.get('/', (req, res) => res.send('wena'));

router.post('/register', registerRequest);

router.post('/login', loginRequest);

router.get('/profile', verifyToken, userProfile);

router.post('/profile/update', verifyToken, updateProfile);

router.post('/profile/update-img', upload.single('user_profile_img_name'), verifyToken, updateUserImg);

router.get('/profile/get-img', verifyToken, getUserProfileImg);

export default router;