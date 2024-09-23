import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import patientService from "./../../services/patients";
import { PatientDetailValues } from "../../types";
import { Grid, Typography } from '@mui/material';
import Gender from "./Gender";

const PatientDetailPage = () => {

    const [patient, setPatient] = useState<PatientDetailValues | undefined>(undefined);

    const { id } = useParams<{id: string;}>();

    useEffect(() => {

        const fetchPatientDetail = async (id: string): Promise<void> => {
            const patient:PatientDetailValues = await patientService.getPatient(id);
            setPatient(patient);
        };
        void fetchPatientDetail(id as string);

    }, []);
    
    if (!patient) {
        return (
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Typography paragraph style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
                        Error 404 - Not Found
                    </Typography> 
                </Grid>
            </Grid>
        );
    } else {
        return (
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Typography variant="h4" style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
                        {patient.name} <Gender gender={patient.gender}/>
                    </Typography> 
                    <Typography paragraph style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
                        ssn: {patient.ssn}<br/>
                        occupation: {patient.occupation}
                    </Typography> 
                </Grid>
            </Grid>
        );
    }
};  

export default PatientDetailPage;