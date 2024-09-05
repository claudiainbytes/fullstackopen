import { useState, useEffect } from 'react'

import Header from './components/Header'
import Diaries from './components/Diaries'

import { DiaryEntry } from './types';

import diaryService from "./services/diaries"

function App() {

  const diaryTitle: string = "Diary Entries";

  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {

    const fetchDiariesList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    void fetchDiariesList();
  }, []);

  return (
    <>
        <Header name={diaryTitle} />
        <Diaries diaries={diaries} />
    </>
  )
}

export default App
