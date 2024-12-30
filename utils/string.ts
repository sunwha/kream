import { differenceInDays } from "date-fns";

export function daysFromToday(dateString: string): number {
  const inputDate = new Date(dateString);
  const today = new Date();
  return differenceInDays(today, inputDate);
}
