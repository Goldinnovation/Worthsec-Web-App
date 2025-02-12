import { Router } from 'express'
const router = Router();
import handleUserImageProfileUpload from '../../controller/User/handleuserProfilePictureMobileUpload'
// import convertTokenNprocessImage from '../../Middlware/User/convertTokenNProcessImage';
import CategoryConvertToken from '../../Middlware/User/categoryConverToken';

router.post('/', CategoryConvertToken , handleUserImageProfileUpload )


export default router