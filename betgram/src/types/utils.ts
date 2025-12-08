export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

export interface User {
  _id: string;
  username: string;
  email: string;
  timezone: string;
  tokens: any;
  isVerified?: boolean;
  language: string;
  nameColor?: string;
  avatar?: string;
}

export  const BONUS_TABLE = [
    { events: 5, bonus: 0.06 },
    { events: 6, bonus: 0.124 },
    { events: 7, bonus: 0.191 },
    { events: 8, bonus: 0.262 },
    { events: 9, bonus: 0.338 },
    { events: 10, bonus: 0.419 },
    { events: 11, bonus: 0.504 },
    { events: 12, bonus: 0.594 },
    { events: 13, bonus: 0.689 },
    { events: 14, bonus: 0.791 },
    { events: 15, bonus: 0.899 },
    { events: 16, bonus: 1.012 },
    { events: 17, bonus: 1.133 },
    { events: 18, bonus: 1.261 },
    { events: 19, bonus: 1.397 },
    { events: 20, bonus: 1.54 },
    { events: 21, bonus: 1.693 },
    { events: 22, bonus: 1.854 },
    { events: 23, bonus: 2.026 },
    { events: 24, bonus: 2.207 },
    { events: 25, bonus: 2.4 },
    { events: 26, bonus: 2.604 },
    { events: 27, bonus: 2.82 },
    { events: 28, bonus: 3.049 },
    { events: 29, bonus: 3.292 },
    { events: 30, bonus: 3.549 },
  ];
