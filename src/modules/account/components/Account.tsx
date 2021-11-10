import { Container, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Bar } from 'react-chartjs-2';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from "react";
import { URLs } from "../../general/utils/urls";

interface Biometric {
  date: string;
  height: number;
  weight: number;
}

export default function Account() {
  const [lastestWeight, setLastestWeight] = useState(0);
  const [lastestHeight, setLastestHeight] = useState(0);
  const [lastestCaloriesConsumed, setLastestCaloriesConsumed] = useState(0);
  const [lastestFatIndex, setLastestFatIndex] = useState(0);

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Weight',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 1,
      },
    ],
  });

  const [options, setOptions] = useState({
    scales: {
      y: {
        beginAtZero: false,
        suggestedMin: 0,
        suggestedMax: 0
      }
    }
  });

  let firstName = JSON.parse(localStorage.getItem("user")!).firstName;
  let lastName = JSON.parse(localStorage.getItem("user")!).lastName;

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let userId = JSON.parse(localStorage.getItem("user")!).id;


    fetch(`${URLs.dashboard}/${userId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLastestWeight(data.latestBiometrics.weight);
        setLastestHeight(data.latestBiometrics.height);
        setLastestCaloriesConsumed(data.latestBiometrics.caloriesConsumed);
        setLastestFatIndex(data.latestBiometrics.fatIndex);
        let dates = data.biometricHistory.map((bio: Biometric) => bio.date.substring(0, 10));
        let weights = data.biometricHistory.map((bio: Biometric) => bio.weight);
        setData({
          labels: dates,
          datasets: [
            {
              label: 'Weight',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderWidth: 1,
              data: weights
            }
          ]
        });
        setOptions({
          scales: {
            y: {
              beginAtZero: false,
              suggestedMin: Math.min(...weights) - 1,
              suggestedMax: Math.max(...weights) + 1
            }
          }
        })
        console.log(options);
      });
  }, []);

  return (
    <Container maxWidth="lg" style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>

    <Stack direction="row" spacing={2}>
      <Avatar src="" style={{margin: '15px'}} />
      <Typography variant="h3" style={{margin: '10px'}}> {firstName} {lastName} </Typography>
    </Stack>

    <br/>
    
      <div style={{display: 'flex'}}>
        <Card sx={{ maxWidth: 345, minWidth: 200 }} style={{margin: '10px'}}>
          <CardContent>
            <Typography variant="h6" color="primary">
              Latest Weight
            </Typography>
            <Typography variant="h5">
              {lastestWeight} kg
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345, minWidth: 200 }} style={{margin: '10px'}}>
          <CardContent>
            <Typography variant="h6" color="primary">
              Latest Height
            </Typography>
            <Typography variant="h5">
              {lastestHeight} m
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345, minWidth: 200 }} style={{margin: '10px'}}>
          <CardContent>
            <Typography variant="h6" color="primary">
              Calories consumed
            </Typography>
            <Typography variant="h5">
              {lastestCaloriesConsumed} cal
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345, minWidth: 200 }} style={{margin: '10px'}}>
          <CardContent>
            <Typography variant="h6" color="primary">
              Fat index
            </Typography>
            <Typography variant="h5">
              {lastestFatIndex}%
            </Typography>
          </CardContent>
        </Card>
      </div>
      <br/>
      <br/>
      <div style={{width: '50vw'}}>
        <Bar data={data} options={options}/>
      </div>  
      <br/>
      <br/>    
    </Container>
  );
}
