import { useState, useEffect } from 'react'

import Header from './components/Header'
import Diaries from './components/Diaries'
import Notification from './components/Notification'

import { DiaryEntry, NotificationProps } from './types';

import diaryService from "./services/diaries"

function App() {

  const diaryTitle: string = "Diary Entries";

  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [message] = useState<NotificationProps>({ message: 'Notification message test', classname:'success' });

  useEffect(() => {
   
    const fetchDiariesList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    void fetchDiariesList();
  }, [diaries]);

  return (
    <>
        <Notification message={message} />
        <Header name={diaryTitle} />
        { (diaries.length > 0) && (
          <Diaries diaries={diaries} />
        )}
    </>
  )
}

export default App