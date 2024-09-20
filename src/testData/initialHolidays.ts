export const initialHolidays: HolidayProgressSummary[] = [
    {
        id: '1',
        name: 'Christmas 2024',
        date: '2024-12-25',
        gifteeMap: {
            123: {
                giftsBought: 2,
                giftsCommitted: 4,
            },
            456: {
                giftsBought: 0,
                giftsCommitted: 1,
            },
            789: {
                giftsBought: 1,
                giftsCommitted: 2,
            },
        },
    },
    {
        id: '2',
        name: "Meg's 24th Birthday",
        date: '2025-03-15',
        gifteeMap: {
            123: {
                giftsBought: 2,
                giftsCommitted: 3,
            },
        },
    },
]
