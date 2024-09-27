import Diagnose from "./Diagnose";
import { Entry } from "../../types";
import HealthCheckRating from "./HealthCheckRating";
import { Typography, Box, Card, CardContent, Icon } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const EntryBase = ({entry}:{entry: Entry}) => {  

    let iconType:React.ReactNode = <></>; 
    let discharge:React.ReactNode = <></>; 
    let sickLeave:React.ReactNode = <></>;
    let healthCheckRating: React.ReactNode = <></>;

    switch(entry.type){
        case "Hospital":
            iconType = <Icon component={LocalHospitalIcon} sx={{ display: "inline" }}/>;
            discharge =  <Box sx={{ fontStyle: 'normal', m: 0, display: 'block' }}>discharge at {entry.discharge.date} {entry.discharge.criteria}</Box>;   
        break;
        case "OccupationalHealthcare":
            iconType = <><Icon component={MedicalInformationIcon} sx={{ display: "inline", marginRight: "0.2em" }}/>{entry.employerName}</>;
            sickLeave = (entry.sickLeave) ? <Box sx={{ fontStyle: 'normal', m: 0, display: 'block', marginBottom: "0.2em" }}>sick leave: from {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}</Box> : <></>;
        break;
        case "HealthCheck":
            iconType = <Icon component={MonitorHeartIcon} sx={{ display: "inline" }}/>; 
            healthCheckRating = <HealthCheckRating healthrate={entry.healthCheckRating}/>;
        break;
    }

    return (
            <Card variant="outlined" sx={{marginTop: "0.2em", marginBottom: "0.2em"}}>
                <CardContent>
                <Box sx={{ fontStyle: 'normal', m: 0, display: 'block', marginBottom: "0.2em" }}>
                    <Box sx={{ display: 'flex', alignItems: "center" }}>
                        <Typography paragraph align="center" sx={{ marginTop: "0em", marginBottom: "0", marginRight: "0.5em", display: "inline" }}>{entry.date}</Typography>
                        {iconType}
                    </Box>
                </Box>
                <Box sx={{ fontStyle: 'italic', m: 0, display: 'block', marginBottom: "0.2em" }}>{entry.description}</Box>
                {healthCheckRating}
                <Box sx={{ fontStyle: 'normal', m: 0, display: 'block', marginBottom: "0.2em" }}>diagnosed by {entry.specialist}</Box>
                {(entry.diagnosisCodes) ?
                    <ul>
                        { entry.diagnosisCodes.map((diagnoseCode: string, index: number) => 
                            <li key={index}><Diagnose code={diagnoseCode}/></li>  
                        )
                        }
                    </ul> 
                    : null 
                }
                {sickLeave}
                {discharge}
                </CardContent>
            </Card>
        );  
};
  
export default EntryBase;