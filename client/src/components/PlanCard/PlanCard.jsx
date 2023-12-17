import { Typography, Box,} from "@mui/material"
import './PlanCard.css'


const PlanCard = ({ plan, color, effectColor, price, quantity, discount, image }) => {
    return(
        <Box className="card-container">
            <Box className="card-header" sx={{ background: `#${color}`, boxShadow: `inset 0 0 10px 5px ${effectColor}`,}}>
                {discount > 0 ? 
                <Box className='custom-discount-badge'>
                    <Typography className="custom-discount-text">{discount}%</Typography>
                </Box>
                : ''}
                <Box>
                    <Typography className={`card-header-title ${discount <= 0 ? 'header-title-no-discount' : ''}`}>{plan}</Typography>
                </Box>  
            </Box>
            <Box>
                <img src={image} alt="" className="plan-card-image" />
            </Box>

            <Typography className="price-for-one">{Math.round(price / quantity)}₽ за одну</Typography>
            <Typography className="price-plan">{quantity}шт/{Math.round(price)}₽</Typography>

            <Box className="buy-plan-button">
                <Typography className="buy-plan-button-text">Купить</Typography>
            </Box>
        </Box>
    )
}


export default PlanCard