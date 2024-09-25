import { Entry } from "../../types";
import { Typography, Box } from '@mui/material';

const Entries = ({ entries } : { entries: Array<Entry> }) => {
    if(entries.length > 0) {
        return(
            <>
                <Typography variant="h6" style={{ marginTop: "0em", marginBottom: "0.5em" }}>
                    Entries
                </Typography>
                { entries.map((entry: Entry, index: number) => 
                     <Typography component="div" style={{ marginTop: "0em", marginBottom: "0.5em" }} key={index}>
                        <Box sx={{ fontStyle: 'normal', m: 0, display: 'inline' }}>{entry.date}</Box>
                        <Box sx={{ fontStyle: 'italic', m: 0, display: 'inline' }}>{entry.description}</Box>
                        {(entry.diagnosisCodes) ?
                            <ul>
                                { entry.diagnosisCodes.map((diagnoseCode: string, index: number) => 
                                    <li key={index}>{diagnoseCode}</li>  
                                )
                                }
                            </ul> 
                            : null 
                        }
                    </Typography>
                )}
            </>
        );
    }
    return null;
};  

export default Entries;