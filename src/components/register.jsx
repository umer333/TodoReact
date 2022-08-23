import {ErrorMessage, Field, Form, Formik} from "formik";
import image from '../assets/images/signup-image.jpg'
import {Link, useNavigate} from 'react-router-dom'
import {register} from "../services/apisList";
import {registerSchema} from '../services/validation'
import LoginValidate from "../services/validateLogin";


const Register = () => {
    LoginValidate()
    const navigate=useNavigate()
    const submitForm =async (username, email, password, designation, company)=> {
    try{
      const result= await register(username, email, password, designation, company)
      if(result.status===201){
        navigate('/login')
      }
    }catch(e){
      console.log(e.response);
    }
  }
    return(

    <Formik initialValues={{
        "user":"",
        "email":"",
        "company":"",
        "password":"",
        "designation":""
    }}
            validationSchema={registerSchema}
            onSubmit={(values)=>{submitForm(values.user, values.email, values.password, values.designation, values.company)
    }}>
    <section style={{marginTop:80}} className="signup">
        <div className="container">
            <div className="signup-content">
                <div className="signup-form">
                    <h2 className="form-title">Sign up</h2>
                    <Form className="register-form" id="register-form">
                        <div className="form-group">
                            <label htmlFor="user"><i className="zmdi zmdi-account material-icons-name"></i></label>
                            <Field id="user" name="user" type="text" placeholder="Username" />
                        </div>
                        <ErrorMessage name="user" render={ msg=> <div style={{color:'red'}}>{msg}</div>}/>
                        <div className="form-group">
                            <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                            <Field id="email" name="email" type="email" placeholder="Email" />
                        </div>
                        <ErrorMessage name="email" render={ msg=> <div style={{color:'red'}}>{msg}</div>}/>
                        <div className="form-group">
                            <label htmlFor="password"><i className="zmdi zmdi-lock"></i></label>
                            <Field id="password" name="password" type="password" placeholder="Password" />
                        </div>
                        <ErrorMessage name="password" render={ msg=> <div style={{color:'red'}}>{msg}</div>}/>
                        <div className="form-group">
                            <label htmlFor="company"><i className="zmdi zmdi-assignment"></i></label>
                            <Field id="company" name="company" type="text" placeholder="Company" />
                        </div>
                        <ErrorMessage name="company" render={ msg=> <div style={{color:'red'}}>{msg}</div>}/>
                        <div className="form-group">
                            <label htmlFor="designation"><i className="zmdi zmdi-code"></i></label>
                            <Field id="designation" name="designation" type="text" placeholder="Designation" />
                        </div>
                        <ErrorMessage name="designation" render={ msg=> <div style={{color:'red'}}>{msg}</div>}/>
                        <div className="form-group form-button">
                        <Field type="submit" name="signup" id="signup" className="form-submit" value="Register"/>
                        </div>
                    </Form>
                </div>
                <div className="signup-image">
                    <figure>
                      <img src={image} alt='register'/>
                    </figure>
                    <Link to={'/login'} className="signup-image-link">
                      I am already member
                    </Link>
          </div>
            </div>
        </div>
    </section>
    </Formik>
    )
}

export default Register;