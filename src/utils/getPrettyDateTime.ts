import { format } from 'date-fns';

export const getPrettyDateTime = (date: Date) => format(new Date(date), 'dd/MM/yyyy - hh:mm:ss');
