import { differenceInDays, differenceInMonths, parse } from 'date-fns'

export function getDateDifference(dateString: string) {
    const today = new Date()
    const targetDate = parse(dateString, 'yyyy-MM-dd', new Date())

    if (targetDate < today) {
        return { days: 0, months: 0 }
    }

    const monthsDifference = differenceInMonths(targetDate, today)

    if (monthsDifference > 0) {
        return `${monthsDifference} ${monthsDifference === 1 ? 'month' : 'months'}`
    }

    const daysDifference = differenceInDays(targetDate, today)

    return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'}`
}
