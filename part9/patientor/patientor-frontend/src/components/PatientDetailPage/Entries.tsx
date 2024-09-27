import { Entry } from "../../types";
import { Typography } from '@mui/material';
import EntryBase from "./EntryBase";

const Entries = ({ entries } : { entries: Array<Entry> }) => {
    if(entries.length > 0) {
        return(
            <>
                <Typography variant="h6" style={{ marginTop: "0em", marginBottom: "0.5em" }}>
                    Entries
                </Typography>
                { entries.map((entry: Entry, index: number) => 
                     <EntryBase entry={entry} key={index}/>
                )}
            </>
        );
    }
    return null;
};  

export default Entries;