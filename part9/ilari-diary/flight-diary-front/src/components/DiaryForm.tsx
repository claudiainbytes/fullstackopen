import { useState } from 'react';
import { DiaryEntry, NewDiaryEntry, Weather, Visibility, NotificationActionReducer } from '../types';
import diaryService from './../services/diaries';
import { useNotificationDispatch } from './../hooks/notificationHooks';

const DiaryForm = () => {

    const notificationDispatch = useNotificationDispatch() as React.Dispatch<NotificationActionReducer>;
    
    const [newDiary, setNewDiary] = useState<NewDiaryEntry>({ date: '', visibility: Visibility.Great, weather: Weather.Sunny, comment: '' });
    const { date, visibility, weather, comment } = newDiary;

    const handleDiaryDate: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setNewDiary({ ...newDiary, date: event.target.value });
    };

    const handleDiaryVisibility = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewDiary({ ...newDiary, visibility: event.target.value });
    };
  
    const handleDiaryWeather = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewDiary({ ...newDiary, weather: event.target.value });
    };

    const handleDiaryComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewDiary({ ...newDiary, comment: event.target.value });
    };

    const handleAddDiary = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        diaryService
            .create(newDiary)
            .then((returnedDiary: DiaryEntry): void => {
                notificationDispatch({ type: 'BLOG_MESSAGE',
                                       payload: { message: `A new blog  ${returnedDiary.date} was added`, classname:'success' }
                                    });
                setTimeout(() => {
                    notificationDispatch({ type: 'EMPTY',
                                       payload: { message: '', classname: '' }
                                    });
                }, 1000)
                setNewDiary({ date: '', visibility: Visibility.Great, weather: Weather.Sunny, comment: '' })
                })
            .catch((error):void => {
                notificationDispatch({ type: 'BLOG_MESSAGE',
                    payload: { message: error.response.data.error, classname:'error' }
                });
                setTimeout(() => {
                    notificationDispatch({ type: 'EMPTY',
                                       payload: { message: '', classname: '' }
                                    });
                }, 1000)
            })
    }

    return(<>
            <h1>Add new entry</h1>
            <form onSubmit={handleAddDiary}>
                <div>
                    <label htmlFor="date">Date &nbsp;</label>
                    <input
                    type="text"
                    value={date}
                    name="date"
                    id="date"    
                    onChange={handleDiaryDate}
                    />
                </div>
                <div>
                    <label htmlFor="visibility">Visibility &nbsp;</label>
                    <input
                    type="text"
                    value={visibility}
                    name="visibility"
                    id="visibility"
                    onChange={handleDiaryVisibility}
                    />
                </div>
                <div>
                    <label htmlFor="weather">Weather &nbsp;</label>
                    <input
                    type="text"
                    value={weather}
                    name="weather"
                    id="weather"
                    onChange={handleDiaryWeather}
                    />
                </div>
                <div>
                    <label htmlFor="comment">Comment &nbsp;</label>
                    <input
                    type="text"
                    value={comment}
                    name="comment"
                    id="comment"
                    onChange={handleDiaryComment}
                    />
                </div>
                <button type="submit">Add</button>
            </form>
    </>)
}
  
export default DiaryForm