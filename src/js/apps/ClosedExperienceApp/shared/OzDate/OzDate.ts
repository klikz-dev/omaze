export class OzDate {
    public static formatTimestamp (date: Date): string {
        const monthNames: string[] = [
            'Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']
        ;

        const month: number = date.getUTCMonth();
        const day: number = date.getUTCDate();
        const year: number = date.getUTCFullYear();

        return `${monthNames[month]} ${day}, ${year}`;
    }

    public static isTimestampValid (dateString: string): boolean {
        const date: number = Date.parse(dateString);

        return !isNaN(date);
    }

    public static getDateFromDateString (dateString: string): Date {
        return new Date(Date.parse(dateString));
    }

    public static isDateValid (date: Date): boolean {
        return !isNaN(date.getTime());
    }
}
