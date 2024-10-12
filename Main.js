import React, { useState, useEffect } from 'react';
import { Container, Typography, Slider, Box, Paper, Grid, Tabs, Tab } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './App.css';

// Register Chart.js components
Chart.register(...registerables);

// Define custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Main Blue
    },
    secondary: {
      main: '#4caf50', // Green Accent
    },
    background: {
      default: '#f4f6f8', // Light Background Color
    },
    text: {
      primary: '#333', // Darker Text Color
      secondary: '#666', // Subtle Text Color
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h4: {
      fontWeight: 700,
      color: '#1976d2',
      marginBottom: '20px',
      marginTop: '20px',
      fontSize: '50px',
    },
    h6: {
      fontWeight: 500,
      color: '#4caf50',
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.7,
      color: '#555',
    },
  },
});

const Main = () => {
  const [gasCars, setGasCars] = useState(0);
  const [electricCars, setElectricCars] = useState(0);
  const [publicTransport, setPublicTransport] = useState(0);
  const [electricBikes, setElectricBikes] = useState(0);
  const [solar, setSolar] = useState(0);
  const [fossil, setFossil] = useState(0);
  const [electricity, setElectricity] = useState(0);
  const [carbonTax, setCarbonTax] = useState(0);
  const [combinedEmissions, setCombinedEmissions] = useState([]);
  const [tabValue, setTabValue] = useState(0); // State to track the active tab

  const baselineCO2 = [
    5494.59, 5541.33, 5441.64, 5212.69, 5162.21, 5154.9, 5142.67, 5113.03, 5066.8, 4996.56,
    4955.94, 4931.03, 4907.22, 4877.69, 4819.97, 4762.14, 4695.88, 4635, 4556.1, 4487.26,
    4462.64, 4446.69, 4437.43, 4422.38, 4400.83, 4391.74, 4391.68, 4396.54, 4405.45, 4409.36
  ];

  const getVehicleArray = (initialVehicles, percentageChange) => {
    let vehicleArray = [];
    let currentVehicles = initialVehicles;

    for (let i = 0; i < 30; i++) {
      currentVehicles = currentVehicles * (1 + percentageChange / 100);
      vehicleArray.push(currentVehicles);
    }

    return vehicleArray;
  };

  const getEnergyArray = (initialEnergy, percentageChange) => {
    let energyArray = [];
    let currentEnergy = initialEnergy;

    for (let i = 0; i < 30; i++) {
      currentEnergy = currentEnergy * (1 + percentageChange / 100);
      energyArray.push(currentEnergy);
    }

    return energyArray;
  }

  const getGasCarArray = (initialGasCars) => {
    return getVehicleArray(initialGasCars, gasCars);
  };

  const getElectricCarArray = (initialElectricCars) => {
    return getVehicleArray(initialElectricCars, electricCars);
  };

  const getPublicTransportArray = (initialPublicTransport) => {
    return getVehicleArray(initialPublicTransport, publicTransport);
  };

  const getElectricBikeArray = (initialElectricBikes) => {
    return getVehicleArray(initialElectricBikes, electricBikes);
  };

  const getSolarArray = (initialSolarEnergy) => {
    return getEnergyArray(initialSolarEnergy, solar);
  }

  const getFossilArray = (initialFossilEnergy) => {
    return getEnergyArray(initialFossilEnergy, fossil);
  }

  const calcGCEmissions = () => {
    const em_per_car = 4.6;
    const getCarsArrayResult = getGasCarArray(231);
    const GCEmissions = [];

    for (let i = 0; i < 30; i++) {
      const carDifference = getCarsArrayResult[i] - 231;
      const emission = em_per_car * carDifference;
      GCEmissions.push(emission);
    }

    return GCEmissions;
  };

  const calcElectricCarEmissions = () => {
    const em_per_electric_car = 2.3;
    const electricCarsArray = getElectricCarArray(16.5);
    const ECEmissions = [];

    for (let i = 0; i < 30; i++) {
      const carDifference = electricCarsArray[i] - 16.5;
      const emission = em_per_electric_car * carDifference;
      ECEmissions.push(emission);
    }

    return ECEmissions;
  };

  const calcPublicTransportEmissions = () => {
    const em_per_public_transport = 3.22;
    const publicTransportArray = getPublicTransportArray(9.2);
    const PTEmissions = [];

    for (let i = 0; i < 30; i++) {
      const transportDifference = publicTransportArray[i] - 9.2;
      const emission = em_per_public_transport * transportDifference;
      PTEmissions.push(emission);
    }

    return PTEmissions;
  };

  const calcElectricBikeEmissions = () => {
    const em_per_bike = 0.05;
    const electricBikeArray = getElectricBikeArray(1.28);
    const EBEmissions = [];

    for (let i = 0; i < 30; i++) {
      const bikeDifference = electricBikeArray[i] - 1.28;
      const emission = em_per_bike * bikeDifference;
      EBEmissions.push(emission);
    }

    return EBEmissions;
  };

  const calcSolarEnergyEmissions = () => {
    const em_per_solar = -20; 
    const solarArray = getSolarArray(1.1);
    const solarEmissions = [];

    for (let i = 0; i < 30; i++) {
      const solarDifference = solarArray[i] - 1.1; 
      const emission = em_per_solar * solarDifference;
      solarEmissions.push(emission);
    }

    return solarEmissions;
  }

  const calcFossilEnergyEmissions = () => {
    const fossilArray = getFossilArray(4800);
    const fossilEmissions = [];

    for (let i = 0; i < 30; i++) {
      const fossilDifference = fossilArray[i] - 4800;
      const emission = .5 * fossilDifference;
      fossilEmissions.push(emission);
    }

    return fossilEmissions;
  }
  
  const calcElectricityEmissions = () => {
    const electricityChange = [];

    for (let i = 0; i < 30; i++) {
      const pdecrease = electricity / 1000;
      const emission = baselineCO2[i] * ((1 + pdecrease) ** i - 1);
      electricityChange.push(emission);
    }

    return electricityChange;
  }

  const calcCarbonTax = () => {
    const carbonTaxChange = [];

    for (let i = 0; i < 30; i++) {
      const pdecrease = carbonTax / 1000;
      const emission = baselineCO2[i] * ((1 - pdecrease) ** i - 1);
      carbonTaxChange.push(emission);
    }

    return carbonTaxChange;
  }

  const combineEmissionsWithBaseline = () => {
    const GCEmissions = calcGCEmissions();
    const ECEmissions = calcElectricCarEmissions();
    const PTEmissions = calcPublicTransportEmissions();
    const EBEmissions = calcElectricBikeEmissions();
    const solarEmissions = calcSolarEnergyEmissions();
    const fossilEmissions = calcFossilEnergyEmissions();
    const carbonTaxChange = calcCarbonTax();
    const electrictyChange = calcElectricityEmissions();

    const combined = baselineCO2.map((baseline, index) =>
      baseline + GCEmissions[index] + ECEmissions[index] + PTEmissions[index] + EBEmissions[index] + fossilEmissions[index] + solarEmissions[index] + electrictyChange[index] + carbonTaxChange[index]
    );
    
    setCombinedEmissions(combined);
  };

  useEffect(() => {
    combineEmissionsWithBaseline();
  }, [gasCars, electricCars, publicTransport, electricBikes, solar, fossil, carbonTax, electricity]);

  const chartData = {
    labels: Array.from({ length: 30 }, (_, i) => 2024 + i),
    datasets: [
      {
        label: 'Projected CO2 Emissions',
        data: combinedEmissions,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false, 
        tension: 0.1,
      },
      {
        label: 'Baseline CO2 Emissions',
        data: baselineCO2,
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false, 
        tension: 0.1,
      },
    ],
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#fff', marginBottom: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            CO2 Emissions Simulator
          </Typography>

          <Box sx={{ padding: 2 }}>
            <Typography variant="h6">Gasoline Cars</Typography>
            <Slider
              value={gasCars}
              onChange={(e, value) => setGasCars(value)}
              aria-labelledby="gas-cars-slider"
              valueLabelDisplay="auto"
              step={1}
              min={-100}
              max={100}
            />

            <Typography variant="h6">Electric Cars</Typography>
            <Slider
              value={electricCars}
              onChange={(e, value) => setElectricCars(value)}
              aria-labelledby="electric-cars-slider"
              valueLabelDisplay="auto"
              step={1}
              min={-100}
              max={100}
            />

            <Typography variant="h6">Public Transport Usage</Typography>
            <Slider
              value={publicTransport}
              onChange={(e, value) => setPublicTransport(value)}
              aria-labelledby="public-transport-slider"
              valueLabelDisplay="auto"
              step={1}
              min={-100}
              max={100}
            />

            <Typography variant="h6">Electric Bikes</Typography>
            <Slider
              value={electricBikes}
              onChange={(e, value) => setElectricBikes(value)}
              aria-labelledby="electric-bikes-slider"
              valueLabelDisplay="auto"
              step={1}
              min={-100}
              max={100}
            />

            <Typography variant="h6">Solar Energy</Typography>
            <Slider
              value={solar}
              onChange={(e, value) => setSolar(value)}
              aria-labelledby="solar-energy-slider"
              valueLabelDisplay="auto"
              step={1}
              min={-100}
              max={100}
            />

            <Typography variant="h6">Fossil Fuel Usage</Typography>
            <Slider
              value={fossil}
              onChange={(e, value) => setFossil(value)}
              aria-labelledby="fossil-fuel-slider"
              valueLabelDisplay="auto"
              step={1}
              min={-100}
              max={100}
            />

            <Typography variant="h6">Electricity Demand</Typography>
            <Slider
              value={electricity}
              onChange={(e, value) => setElectricity(value)}
              aria-labelledby="electricity-slider"
              valueLabelDisplay="auto"
              step={1}
              min={-100}
              max={100}
            />

            <Typography variant="h6">Carbon Tax</Typography>
            <Slider
              value={carbonTax}
              onChange={(e, value) => setCarbonTax(value)}
              aria-labelledby="carbon-tax-slider"
              valueLabelDisplay="auto"
              step={1}
              min={-100}
              max={100}
            />
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#fff' }}>
          <Typography variant="h5" align="center" gutterBottom>
            CO2 Emissions Chart
          </Typography>

          <Line data={chartData} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Main;
