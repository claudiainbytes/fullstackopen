import { Icon, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheckRating = ({ healthrate } : { healthrate: number }) => {
 
    let color: string = "black";

    switch(healthrate) {
        case 0:    
            color = "red";
        break;
        case 1:
            color = "orange";
        break;
        case 2:
            color = "green";
        break;
        case 3:
            color = "blue";
        break;
    }
    
    return(<Box sx={{ fontStyle: 'normal', m: 0, display: 'block', marginBottom: "0.2em" }}>
            <Icon component={FavoriteIcon} sx={{ display: "inline", color: color }}/>
          </Box>);
};
  
export default HealthCheckRating;