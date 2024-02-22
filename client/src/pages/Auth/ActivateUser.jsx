import { useEffect } from "react"
import { useParams, useNavigate } from 'react-router-dom';
import { activateUserRequest } from '../../api/Auth/activateUserRequest'
import useDocumentTitle from "../../utils/useDocumentTitle";

const ActivateUser = () => {
    const {uid, token} = useParams()
    const navigate = useNavigate()
    useDocumentTitle('Активация аккаунта')

    useEffect(() => {
        activateUserRequest({uid: uid, token: token})
        navigate('/login')
    }, [uid, token, navigate])
}

export default ActivateUser