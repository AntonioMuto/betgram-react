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
  const dateLuxon = DateTime.fromJSDate(d).setZone(timezone);
  const now = DateTime.now().setZone(timezone);

  const time = dateLuxon.toFormat("HH:mm");

  return time;
}

export function formatDateTimeToTimezone(
  date: string | Date,
  timezone: string,
  options?: Intl.DateTimeFormatOptions
) {
  const d = typeof date === "string" ? new Date(date) : date;
  const dateLuxon = DateTime.fromJSDate(d).setZone();
  const now = DateTime.now().setZone(timezone);

  const isYesterday = dateLuxon.hasSame(now.minus({ days: 1 }), "day");
  const isTomorrow = dateLuxon.hasSame(now.plus({ days: 1 }), "day");
  const isToday = dateLuxon.hasSame(now, "day");

  const time = dateLuxon.toFormat("HH:mm");

  if(isYesterday) {
    return `Ieri ${time}`
  }
  if (isTomorrow) {
    return `Domani ${time}`;
  }
  if (isToday) {
    return `Oggi ${time}`;
  }

  return dateLuxon.toFormat("dd/MM/yyyy - HH:mm");
}

export function formatDateTimeToTimezoneBet(
  date: string | Date,
  timezone: string,
  options?: Intl.DateTimeFormatOptions
) {
  const d = typeof date === "string" ? new Date(date) : date;
  const dateLuxon = DateTime.fromJSDate(d).setZone(timezone);
  const now = DateTime.now().setZone(timezone);

  const isYesterday = dateLuxon.hasSame(now.minus({ days: 1 }), "day");
  const isTomorrow = dateLuxon.hasSame(now.plus({ days: 1 }), "day");
  const isToday = dateLuxon.hasSame(now, "day");

  const time = dateLuxon.toFormat("HH:mm");

  if(isYesterday) {
    return `Ieri ${time}`
  }
  if (isTomorrow) {
    return `Domani ${time}`;
  }
  if (isToday) {
    return `Oggi ${time}`;
  }

  return dateLuxon.toFormat("dd/MM/yyyy HH:mm");
}

export function getCurrentDate(timezone: string) {
  return DateTime.now().setZone(timezone).toFormat("yyyy-MM-dd")
}