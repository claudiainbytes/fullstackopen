import { Icon } from '@mui/material';
import MaleIcon  from '@mui/icons-material/Male';
import FemaleIcon  from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const Gender = ({ gender } :{ gender: string }) => {
    switch(gender){
        case "female":    
            return <Icon component={FemaleIcon} />; 
        break;
        case "male":
            return <Icon component={MaleIcon} />; 
        break;
        case "other":
            return <Icon component={QuestionMarkIcon}/>; 
        break;
    }
};
  
export default Gender;