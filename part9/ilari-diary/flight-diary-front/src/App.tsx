import { useState, useEffect } from 'react'

import Header from './components/Header'
import Diaries from './components/Diaries'
import DiaryForm from './components/DiaryForm'
import Notification from './components/Notification'

import { DiaryEntry, NotificationType } from './types';

import { useNotificationValue } from './hooks/notificationHooks'; 

import diaryService from "./services/diaries"

function App() {

  const diaryTitle: string = "Diary Entries";
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const notification = useNotificationValue() as NotificationType;

  useEffect(() => {
   
    const fetchDiariesList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    void fetchDiariesList();
  }, [diaries]);

  return (
    <>
        <Notification notification={notification} />
        <DiaryForm />
        <Header name={diaryTitle} />
        { (diaries.length > 0) && (
          <Diaries diaries={diaries} />
        )}
    </>
  )
}

export default App