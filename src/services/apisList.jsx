import axios from "axios";

const BACKEND_URL = 'http://192.168.24.65:8000'

export const register = (username, email, password, designation, company) => {
    return axios.post(`${BACKEND_URL}/signup/`,{
    username: username,
    email: email,
    password: password,
    designation: designation,
    company: company
})
}

export const signin = (username, password) => {
    return axios.post(`${BACKEND_URL}/signin/`,{
    username: username,
    password: password,
})
}

export const get_tasks = (start_date, end_date) => {
    // console.log("ok",month,year)
    return axios.post(`${BACKEND_URL}/get_tasks/`,{
    start_date: start_date,
    end_date: end_date
},{
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
    })

}

export const add_tasks = (title, start_time, end_time, description) =>{
   return axios.post(`${BACKEND_URL}/add_task/`,{
        title: title ,
        start_time: new Date(start_time),
       end_time: new Date(end_time),
       description: description
    },{
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
    })
}
