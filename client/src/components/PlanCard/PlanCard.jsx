import { Typography, Box,} from "@mui/material"
import './PlanCard.css'


const PlanCard = ({ plan, color, effectColor, price, quantity, discount }) => {
    return(
        <Box className="card-container">
            <Box className="card-header" sx={{ background: `#${color}`, boxShadow: `inset 0 0 10px 5px ${effectColor}`,}}>
                <Box className='custom-discount-badge'>
                    <Typography className="custom-discount-text">{discount}%</Typography>
                </Box>
                <Box>
                    <Typography className="card-header-title">{plan}</Typography>
                </Box>
               
            </Box>
            <Typography className="price-for-one">{price / quantity}₽ за одну</Typography>
            <Typography className="price-plan">{quantity}шт/{price}₽</Typography>

            <Box className="buy-plan-button">
                <Typography className="buy-plan-button-text">Купить</Typography>
            </Box>
        </Box>
    )
}


export default PlanCard