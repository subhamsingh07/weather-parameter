import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Weather.css'
import Temp from './temp.png'
import Press from './pressure.png'
import Hum from './hum.png'
import Typography from '@mui/material/Typography'
import { Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';

function Weather() {

    const [temperature, setTemperature] = useState("")
    const [pressure, setpressure] = useState("")
    const [humidity, setHumidity] = useState("")

    const fetchApi = () => {

        console.log("fetching.....");


        axios.get("https://api.thingspeak.com/channels/2012318/feeds.json?api_key=FK12M8MOL52EWTJD&results=2").then((res) => {
            // console.log(res.data.feeds[1].field1);
            // console.log(res.data);
            console.log("fetched.....");

            setTemperature(res.data.feeds[1].field1)
            setpressure(res.data.feeds[1].field2)
            setHumidity(res.data.feeds[1].field3)
            

        })

        // console.log("temperature : " + temperature);
        // console.log("pressure : " + pressure);

    }
    window.setInterval(fetchApi, 5000)

    useEffect(() => {
        fetchApi()

    }, [])

    return (
        <>
            <div className='header'>
                <h1>MINI WEATHER STATION</h1>
            </div>
            <div className='main'>

                <Card sx={{ minWidth: 345, padding: 8 }} elevation={5}>
                    <div className='temp'>
                        <img src={Temp} style={{ height: 120, }} />
                        <Typography variant="h3" color="initial" style={{ paddingLeft: 30 }}>{temperature}°C</Typography>
                    </div>
                    <br />
                    <div className='temp'>
                        <img src={Press} style={{ height: 120 }} />
                        <Typography variant="h3" color="initial" style={{ paddingLeft: 30 }}>{pressure} Pa</Typography>
                    </div>
                    <br />
                    <div className='temp'>
                        <img src={Press} style={{ height: 120 }} />
                        <Typography variant="h3" color="initial" style={{ paddingLeft: 30 }}>{humidity} Pa</Typography>
                    </div>

                    <div className='btn'>
                        <Button size="large" variant='contained' onClick={() => { fetchApi() }}>Refesh</Button>
                    </div>
                </Card>
            </div>

            {/* <div>
                <Typography variant="h2" color="initial">Temperature : {temperature} °C</Typography>
                <Typography variant="h2" color="initial">Pressure : {pressure} Pa</Typography>
            </div> */}
        </>
    )
}

export default Weather
