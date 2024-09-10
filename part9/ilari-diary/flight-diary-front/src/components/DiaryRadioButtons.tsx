import { DiaryRadioButtonProps } from './../types';

const DiaryRadioButton = ({ name, options, handlerChange } : DiaryRadioButtonProps ) => {

    const radioName: string = name.toLowerCase();
  
    return (
      <div className="diaryRadioButtons">
        <div>{name}</div>
        <ul>
        { options.map(item => 
              <li key={item.label}>
                <input 
                  type="radio" 
                  id={`${radioName}_${item.value}`} 
                  name={radioName} 
                  value={item.value} 
                  onChange={handlerChange} 
                />
                <label htmlFor={item.label}>{item.label}</label>
              </li>
          )
        }
        </ul>
      </div>
    )
  }

  export default DiaryRadioButton