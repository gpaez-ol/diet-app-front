import { Container, Typography } from "@mui/material";
import React, { useState } from "react";
import DietCard from '../../general/components/DietCard';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Diet from '../../general/interfaces/Diet';
import { Bar } from 'react-chartjs-2';
import { URLs } from "../../general/utils/urls";
import Dialog from "@mui/material/Dialog";
import AddBiometric from './AddBiometric';

const data = {
  labels: ['10/10/21', '11/10/21', '12/10/21', '13/10/21'],
  datasets: [
    {
      label: 'Weight',
      data: [85, 83, 81, 80],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: false,
      suggestedMin: 75,
      suggestedMax: 90
    }
  }
}

export default function Dashboard() {

  const [addBiometricOpen, setAddBiometricOpen] = useState(false);

  let diets: Diet[] = [
    {name: "nose", description: "description"},
    {name: "nose1", description: "description"},
    {name: "nose2", description: "description"},
    {name: "nose3", description: "description"},
    {name: "nose4", description: "description"}
  ];

  const getBiometrics = () => {
    /*const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let userId = JSON.parse(localStorage.getItem("user")!).id;

    fetch(`${URLs.biometric}/${userId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
    });*/
  };

  return (
    <Container maxWidth="lg" style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <Typography variant="h3" style={{margin: '10px'}}> Dashboard </Typography>
      <Card>
        <CardHeader title="My diets"/>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {
            diets.map(diet => {
              return <DietCard {...diet} />
            })
          }
        </div>
        <CardActions style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
          <Button variant="contained"> See more </Button>
        </CardActions>
      </Card>
      <br/>
      <div style={{display: 'flex'}}>
        <Card sx={{ maxWidth: 345, minWidth: 200 }} style={{margin: '10px'}}>
          <CardContent>
            <Typography variant="h6" color="primary">
              Latest Weight
            </Typography>
            <Typography variant="h5">
              80 kg
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345, minWidth: 200 }} style={{margin: '10px'}}>
          <CardContent>
            <Typography variant="h6" color="primary">
              Latest Height
            </Typography>
            <Typography variant="h5">
              1.70 m
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345, minWidth: 200 }} style={{margin: '10px'}}>
          <CardContent>
            <Typography variant="h6" color="primary">
              Calories consumed
            </Typography>
            <Typography variant="h5">
              0 cal
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345, minWidth: 200 }} style={{margin: '10px'}}>
          <CardContent>
            <Typography variant="h6" color="primary">
              Fat index
            </Typography>
            <Typography variant="h5">
              0%
            </Typography>
          </CardContent>
        </Card>
      </div>
      <br/>
      <Button onClick={() => setAddBiometricOpen(true)}>Add Biometrics</Button>
      <Dialog onClose={() => setAddBiometricOpen(false)} open={addBiometricOpen}>
        <AddBiometric/>
      </Dialog>
      <br/>
      <div style={{width: '50vw'}}>
        <Bar data={data} options={options}/>
      </div>      
    </Container>
  );
}
