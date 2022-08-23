import {useEffect} from "react";
import {useNavigate,useLocation} from "react-router-dom";


const LoginValidate = () => {
    const navigate = useNavigate()
    const location = useLocation();
    useEffect(() => {
        const action = async () => {
            try {

                const token = localStorage.getItem('token')
                if (token) return navigate(('/calender'))
                if (!token){
                    if(location.pathname === '/register' || location.pathname === '/login') {
                        return "OK"
                    }
                    else {
                        return navigate('/login')
                    }
                }



            } catch (err) {
                if (err.response.status === 404) return navigate('/login')
            }
        }

        action()
    })
}

export default LoginValidate;