import { DiaryEntry } from './../types';

const Diary = ({ diary }: { diary: DiaryEntry }) => 
    {
        return(<p>
                <b>{diary.date}</b>
                <br/><br/>
                <span>visibility: {diary.visibility}</span><br/>
                <span>weather: {diary.weather}</span><br/>
               </p>)
    }
 
export default Diary;