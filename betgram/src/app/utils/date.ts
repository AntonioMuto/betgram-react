'use client'
import { DateTime } from "luxon";

export function formatDateToTimezone(
    date: string | Date,
    timezone: string,
    options?: Intl.DateTimeFormatOptions
  ) {
    const d = typeof date === "string" ? new Date(date) : date;
  
    return d.toLocaleString("it-IT", {
      timeZone: timezone,
      ...options,
    });
  }

  export function formatTimeToTimezone(
    date: string | Date,
    timezone: string,
    options?: Intl.DateTimeFormatOptions
  ) {
    const d = typeof date === "string" ? new Date(date) : date;
  
    const time = d.toLocaleTimeString("it-IT", {
      timeZone: timezone,
      ...options,
    });
    return time.substring(0, 5);
  }

  export function getCurrentDate( timezone: string) {
    return DateTime.now().setZone(timezone).toFormat("yyyy-MM-dd")
  }