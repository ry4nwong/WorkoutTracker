import React, { useEffect, useState } from "react";
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, Snackbar } from "@mui/material";
import { getCookie } from "../../js/Cookies";

const UnitsEditor = ({ units, setUnits }) => {
    const [weightUnit, setWeightUnit] = useState(units.isUsingPounds ? "lbs" : "kgs");
    const [lengthUnit, setLengthUnit] = useState(units.isUsingInches ? "in" : "cm");
    const [distanceUnit, setDistanceUnit] = useState(units.isUsingMiles ? "mi" : "km");
    const [settingsChanged, setSettingsChanged] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    const handleUnitChange = async () => {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    mutation UpdateUnits($id: ID!, $unitsInput: UnitsInput!) {
                        updateUnits(id: $id, unitsInput: $unitsInput) {
                            units {
                                isUsingMiles
                                isUsingInches
                                isUsingPounds
                            }
                        }
                    }
                `,
                variables: {
                    id: getCookie('id'),
                    unitsInput: {
                        isUsingMiles: distanceUnit === 'mi' ? true : false,
                        isUsingPounds: weightUnit === 'lbs' ? true : false,
                        isUsingInches: lengthUnit === 'in' ? true : false
                    },
                },
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const updatedUnits = data?.data?.updateUnits;

            if (updatedUnits) {
                const { isUsingMiles, isUsingInches, isUsingPounds } = updatedUnits.units;
                setDistanceUnit(isUsingMiles ? "mi" : "km");
                setLengthUnit(isUsingInches ? "in" : "cm");
                setWeightUnit(isUsingPounds ? "lbs" : "kgs");
                setUnits({
                    isUsingMiles: isUsingMiles, 
                    isUsingInches: isUsingInches, 
                    isUsingPounds: isUsingPounds
                });

                setSettingsChanged(false);
                setAlertOpen(true);
                console.log(updatedUnits);
            } else {
                console.error("Units update failed:", data?.errors);
            }
        } else {
            console.log("Network error while updating profile");
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%", alignItems: 'center' }}>
            <FormControl sx={{ width: '50%', marginBottom: 2 }}>
                <InputLabel>Weight</InputLabel>
                <Select
                    value={weightUnit}
                    onChange={(e) => {
                        setWeightUnit(e.target.value);
                        setSettingsChanged(true);
                    }}
                    label="Weight"
                >
                    <MenuItem value="lbs">Pounds (lbs)</MenuItem>
                    <MenuItem value="kgs">Kilograms (kgs)</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ width: '50%', marginBottom: 2 }}>
                <InputLabel>Length</InputLabel>
                <Select
                    value={lengthUnit}
                    onChange={(e) => {
                        setLengthUnit(e.target.value);
                        setSettingsChanged(true);
                    }}
                    label="Length"
                >
                    <MenuItem value="in">Inches (in)</MenuItem>
                    <MenuItem value="cm">Centimeters (cm)</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ width: '50%', marginBottom: 2 }}>
                <InputLabel>Distance</InputLabel>
                <Select
                    value={distanceUnit}
                    onChange={(e) => {
                        setDistanceUnit(e.target.value);
                        setSettingsChanged(true);
                    }}
                    label="Distance"
                >
                    <MenuItem value="mi">Miles (mi)</MenuItem>
                    <MenuItem value="km">Kilometers (km)</MenuItem>
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 3, padding: "10px 20px", fontWeight: "bold", width: '40%' }}
                disabled={!settingsChanged}
                onClick={handleUnitChange}
            >
                Save Units
            </Button>
            <Snackbar open={alertOpen} autoHideDuration={5000} onClose={() => setAlertOpen(false)}>
                <Alert severity="success" variant="filled">
                    Units Updated!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UnitsEditor;