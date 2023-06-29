export interface User {
  id: number;
  username: string;
  password: string;
  refresh?: string;
}

export interface Diary {
  content: string;
  user_id: number;
  year: number;
  month: number;
  date: number;
  emotion_id?: number;
}

export interface Todo {
  id: number;
  user_id: number;
  content: string;
  year: number;
  month: number;
  date: number;
  checked?: boolean;
}

export interface Emotion {
  id: number;
  feel: string;
}

export interface Comment {
  id: number;
  todo_id: number;
  content: string;
  emotion_id: number;
}

export interface Image {
  path: string;
  comment_id: number;
}

export interface TodoResponse {
  date: number;
  id: number;
  content: string;
  checked?: boolean;
  comment?: string;
  feel?: string;
}

export interface DiaryResponse {
  date: number;
  content: string;
  feel?: string;
  image?: string;
}
