import { Grid } from "@mui/material"
import Speedometr1 from "../../media/images/speedometr1.png"
import Speedometr2 from "../../media/images/speedometr2.png"
import Speedometr3 from "../../media/images/speedometr3.png"
import Speedometr4 from "../../media/images/speedometr4.png"
import Speedometr5 from "../../media/images/speedometr5.png"
import PlanCard from "../PlanCard/PlanCard"
import { getAllTariffRequest } from "../../api/getAllTariffRequest"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import UserPurchase from "../../utils/UserPurchase"


const AllPlans = () => {
    const [tariffPlans, setTariffPlans] = useState([])
    const {user, authTokens, updateUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const tariffColors = {
        red: {color: 'd11e22', effectColor: 'rgba(255, 214, 214, 0.3)', image: Speedometr1},
        orange: {color: 'f46522', effectColor: 'rgba(255, 246, 214, 0.3)', image: Speedometr2},
        yellow: {color: 'fcbd4b', effectColor: 'rgba(255, 246, 214, 0.3)', image: Speedometr3},
        blue: {color: '01a8ba', effectColor: 'rgba(214, 235, 255, 0.3)', image: Speedometr4},
        green: {color: '029547', effectColor: 'rgba(214, 255, 218, 0.3)', image: Speedometr5},
    };

    const handleTariffBuy = (tariff) => {
        if (user) {
            UserPurchase({ user: user, tariff: tariff, updateUser: updateUser, token: authTokens.access })
        } else {
            navigate('/login')
        }
    }

    useEffect(() => {
        getAllTariffRequest({setData: setTariffPlans})
    }, [])

    return (
        <Grid container>
            {tariffPlans.map((tariff) => {
                const tariffColor = tariffColors[String(tariff?.color)];
                return(
                    <Grid item xs={6} md={6} lg={2.4} xl={2.4} sx={{ margin: '0 auto' }} key={tariff.id}>
                        <PlanCard 
                            plan={tariff.name}
                            color={tariffColor?.color}
                            effectColor={tariffColor?.effectColor}
                            discount={tariff.profit_percentage}
                            quantity={tariff.request_quantity}
                            price={tariff.price}
                            image={tariffColor?.image}
                            handleTariffBuy={() => handleTariffBuy(tariff)}
                        />
                    </Grid>
                )
            })}             
        </Grid>
    )
}

export default AllPlans