import { useState, useEffect } from 'react';
import { Box } from '@mui/material'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

import CrashedCar from '../../media/images/CarCrashed.jpg'
import NewCar from '../../media/images/CarNew.jpg'
import CrashedCar1 from '../../media/images/CarCrashed1.jpg'
import NewCar1 from '../../media/images/CarNew1.jpg'

const CustomCompareSlider = () => {
    const [itemOneSrc, setItemOneSrc] = useState(null);
    const [itemTwoSrc, setItemTwoSrc] = useState(null);

    useEffect(() => {
        const randomNum = Math.random();
    
        if (randomNum < 0.5) {
          setItemOneSrc(NewCar);
          setItemTwoSrc(CrashedCar);
        } else {
          setItemOneSrc(NewCar1);
          setItemTwoSrc(CrashedCar1);
        }
      }, []);

    return(
        <Box>
            <ReactCompareSlider                        
                itemOne={<ReactCompareSliderImage src={itemOneSrc} srcSet={itemOneSrc} alt="Image one" />}
                itemTwo={<ReactCompareSliderImage src={itemTwoSrc} srcSet={itemTwoSrc} alt="Image two" />}
            />
        </Box>
    )
}

export default CustomCompareSlider