import {Formik, Form, Field, ErrorMessage} from "formik";
import {Link, useNavigate} from 'react-router-dom'

import image from '../assets/images/signin-image.jpg'
import {signin} from "../services/apisList";
import {loginSchema} from "../services/validation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginValidate from "../services/validateLogin";

const Login = () =>{
    LoginValidate()
    const navigate=useNavigate()
    const notify = (msg) => toast.error(msg);
    const submitForm =async (username, password)=> {
    try{
      const result= await signin(username, password)
      if(result.status===200){
          notify()
          let token = result.data['access_token']
          localStorage.setItem('token', token)
        navigate('/calender')
      }
    }catch(e){
        notify(e.response.data)
      console.log(e.response);
      ErrorMessage.msg = e.response
    }
  }
    return (
        <Formik initialValues={{
            user:"",
            password:"",
        }}
                validationSchema={loginSchema}
                onSubmit={(values =>{
                submitForm(values.user, values.password)
        })}>
            <section style={{marginTop:80}} className="sign-in">
                <div className="container">
                    <div className="signin-content">
                         <div className="signin-image">
                             <figure>
                                <img src={image} alt="login" />
                             </figure>
                             <Link to={'/register'} className="signup-image-link">
                                Create an account
                            </Link>
                         </div>

                        <div className="signin-form">
                            <h2 className="form-title">Login</h2>
                            <Form className="register-form" id="login-form">
                                <div className="form-group">
                                   <label htmlFor="user">
                                      <i className="zmdi zmdi-account material-icons-name"></i>
                                   </label>
                                    <Field type="text" name="user" id="user" placeholder="Username"/>

                                </div>
                                <ErrorMessage name="user" render={ msg=> <div style={{color:'red'}}>{msg}</div>}/>

                                <div className="form-group">
                                    <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                    <Field type="password" name="password" id="password" placeholder="Password"/>
                                </div>
                                <ErrorMessage name="password" render={msg=> <div style={{color:'red'}}>{msg}</div>}/>

                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit" value="Log in"/>
                                </div>

                            </Form>
                        </div>
                    </div>
                    <ToastContainer />
                </div>

            </section>
        </Formik>
    )

}

export default Login;