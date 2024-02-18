import { useEffect, useState, useContext } from "react"
import { getFavoriteReportList } from "../../../api/Reports/GetFavoriteReportList"
import AuthContext from "../../../context/AuthContext"
import { Box, Typography } from "@mui/material"

import ReportItem from "../../../components/ReportItem/ReportItem"
import Loader from "../../../components/Loader/Loader"

const FavoriteReports = () => {
    const [reports, setReports] = useState()
    const {authTokens} = useContext(AuthContext)
    useEffect(() => {
        getFavoriteReportList({setData: setReports, token: authTokens.access})
    }, [])
    console.log(reports)
    if (!reports) {
        <Loader />
    }
    return(
        <Box>
            <Typography 
                sx={{ textAlign: 'center', marginTop: '25px' }}
                className='profile-title'
            >
                Избранные отчеты
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {reports?.length > 0 ? (
                    <Box sx={{ width: '95%', marginBottom: '15px' }}>
                    {reports.map((report, index) => {
                        return(
                            <ReportItem report={report} token={authTokens.access} key={index} />
                        )
                    })}
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                        <Typography className='profile-title'>Нет избранных отчетов</Typography>
                    </Box>
                )}
            </Box>            
        </Box>

    )
}

export default FavoriteReports