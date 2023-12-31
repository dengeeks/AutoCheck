import axios from 'axios'


export const resetDepartment = ({ department, token }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
        
    axios.post(`${BASE_URL}/admin-panel/reset-department/`, { 
        department: department,
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .catch(() => {
    })
}