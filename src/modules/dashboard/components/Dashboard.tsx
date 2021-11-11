import { Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import DietCard from '../../general/components/DietCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Diet from '../../general/interfaces/Diet';
import { Bar } from 'react-chartjs-2';
import { URLs } from "../../general/utils/urls";
import Dialog from "@mui/material/Dialog";
import AddBiometric from './AddBiometric';
import Slider from "../../general/components/Slider";
import DietInfoCard from "../../general/components/DietInfoCard";

interface Biometric {
  date: string;
  height: number;
  weight: number;
}

const SliderProps = {
  zoomFactor: 30, // How much the image should zoom on hover in percent
  slideMargin: 10, // Margin on each side of slides
  maxVisibleSlides: 5,
  pageTransition: 500, // Transition when flipping pages
};

export default function Dashboard() {

  const [addBiometricOpen, setAddBiometricOpen] = useState(false);
  const [lastestWeight, setLastestWeight] = useState(0);
  const [lastestHeight, setLastestHeight] = useState(0);
  const [lastestCaloriesConsumed, setLastestCaloriesConsumed] = useState(0);
  const [lastestFatIndex, setLastestFatIndex] = useState(0);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeDiet, setActiveDiet] = useState<Diet>({} as Diet);

  const handleDialogOpen = (diet: Diet) => {
    setIsDialogOpen(true);
    setActiveDiet(diet);
  };

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

  const [diets, setDiets] = useState<Diet[]>([]);
  // let diets: Diet[] = [
  //   {name: "nose", description: "description"},
  //   {name: "nose1", description: "description"},
  //   {name: "nose2", description: "description"},
  //   {name: "nose3", description: "description"},
  //   {name: "nose4", description: "description"}
  // ];

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let userId = JSON.parse(localStorage.getItem("user")!).id;

    fetch(`${URLs.dashboard}/${userId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if(data.latestBiometrics !== null) {
          setLastestWeight(data.latestBiometrics.weight);
          setLastestHeight(data.latestBiometrics.height);
          setLastestCaloriesConsumed(data.latestBiometrics.caloriesConsumed);
          setLastestFatIndex(data.latestBiometrics.fatIndex);
        }
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
  }, [options]);

  return (
    <Container maxWidth="lg" style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <Typography variant="h3" style={{margin: '10px'}}> Dashboard </Typography>
      <h2>My diets</h2>
      <Dialog onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
        <DietInfoCard {...activeDiet} />
      </Dialog>
      <Slider {...SliderProps}>
        {diets.map((diet) => (
          <div key={diet.id} onClick={() => handleDialogOpen(diet)}>
            <DietCard {...diet} />
          </div>
        ))}
      </Slider>
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
      <Button onClick={() => setAddBiometricOpen(true)}>Add Biometrics</Button>
      <Dialog onClose={() => setAddBiometricOpen(false)} open={addBiometricOpen}>
        <AddBiometric close={() => setAddBiometricOpen(false)}/>
      </Dialog>
      <br/>
      <div style={{width: '50vw'}}>
        <Bar data={data} options={options}/>
      </div>  
      <br/>
      <br/>    
    </Container>
  );
}
