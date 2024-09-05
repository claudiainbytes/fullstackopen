import Diary from './Diary';
import { DiaryEntry } from './../types';

const Diaries = ({ diaries }: { diaries: DiaryEntry[] }) => diaries.map((diary: DiaryEntry, index: number) => <Diary key={index} diary={diary}/>)
 
export default Diaries