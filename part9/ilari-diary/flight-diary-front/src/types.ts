export interface HeaderProps {
  name: string;
}

export interface NotificationType {
  message: string;
  classname: string;
}

export const notificationInitialState:NotificationType = {
  message: '',
  classname: '',
};
export interface NotificationActionReducer {
  type: string;
  payload: NotificationType;
}

export type FlightdiariesContextType = {
  notification: NotificationType;
  notificationDispatch: React.Dispatch<NotificationActionReducer>;
};

export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
  }
  
  export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
  }
  
  export interface DiaryEntry {
    id?: number;
    date: string;
    weather: Weather | string;
    visibility: Visibility | string;
    comment: string;
  }
  
  export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
  
  export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
  