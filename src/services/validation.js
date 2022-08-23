import * as Yup from "yup"

const loginSchema=Yup.object().shape({
    user: Yup.string().min(4,'Username must be more than 4 character!').required('Username is required!'),
    password: Yup.string().required('Password is required!')
})

const saveTaskSchema=Yup.object().shape({
    title: Yup.string().min(4,'Username must be more than 4 character!').required('Username is required!'),
    start_date: Yup.string().required('Password is required!')
})

const registerSchema = Yup.object().shape({
    user: Yup.string().min(4,'Username must be more than 4 character!').required('Username is required!'),
    email: Yup.string().email('Email format is not valid').required('email is required!'),
    password: Yup.string().min(8,'Password must be more than 8 characters').required('Password is required!'),
    company: Yup.string().min(3,'Company should me more than 3 characters').required('Company name is required.'),
    designation: Yup.string().min(3,'Designation should me more than 3 characters').required('Designation is required.')
})

export {loginSchema, saveTaskSchema, registerSchema}