import { useEffect } from "react"
import { useParams, useNavigate } from 'react-router-dom';
import { activateUserRequest } from '../../api/Auth/activateUserRequest'


const ActivateUser = () => {
    const {uid, token} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        activateUserRequest({uid: uid, token: token})
        navigate('/login')
    }, [uid, token, navigate])
}

export default ActivateUser