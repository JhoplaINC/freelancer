import { Router} from 'express';
import multer from 'multer';
import { verifyToken } from '../controllers/verifyToken.js';
import { registerRequest, 
         loginRequest, 
         userProfile,
         thirdUserProfile,
         updateProfile, 
         updateUserImg }
    from '../controllers/accountController.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/../../public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage});

router.post('/register', registerRequest);

router.post('/login', loginRequest);

router.get('/profile', verifyToken, userProfile);

router.get('/profile/:user_nick', thirdUserProfile);

router.post('/update', verifyToken, updateProfile);

router.post('/update-img', upload.single('user_profile_img_name'), verifyToken, updateUserImg);

export default router;