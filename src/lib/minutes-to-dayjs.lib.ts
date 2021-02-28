import dayjs, {Dayjs} from 'dayjs';

export function minutesToDayjs(minutes: number | undefined): Dayjs {
    if (!minutes)
        return dayjs('00:00', "HH:mm");
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return dayjs(`${h}:${m}`, "H:m");
}