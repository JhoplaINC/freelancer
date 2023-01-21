import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFreelanceContext } from "../../context/FreelanceContext";

export const UpdateProfileImg = () => {
    const {onGetUserData, onNewProfileImg} = useFreelanceContext();
    const [userData, setUserData] = useState({
        img_data: '',
        // user_profile_img_name: '',
        // user_profile_img_size: '',
        // user_profile_img_type: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserData = async () => {
            const user = await onGetUserData();
        }
        loadUserData();
    }, [])

    return (
        <Formik
            initialValues={userData}
            enableReinitialize={true}
            onSubmit={async (values, actions) => {
                const data = new FormData();
                data.append('user_profile_img_name', userData.img_data);
                await onNewProfileImg(data);
                navigate('/profile');
                console.log(data.get('user_profile_img_name'));
            }}
        >
        {({ handleSubmit, values, isSubmitting}) => (
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <p>Editar imagen de perfil</p>
                <ul>
                    <li>
                        <label>Nueva img</label>
                        <input 
                            type="file" 
                            name="user_profile_img_name"
                            accept="image/*"
                            multiple={false}
                            onChange={(e) => {
                                setUserData({
                                    img_data: e.currentTarget.files[0]
                                });
                            }}
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