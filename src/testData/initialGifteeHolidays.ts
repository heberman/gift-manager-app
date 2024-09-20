export const initialGifteeHolidays: GifteeHolidayDetails[] = [
    {
        gifteeId: '123',
        id: '1',
        name: 'Christmas 2024',
        date: '2024-12-25',
        progress: {
            giftsBought: 2,
            giftsCommitted: 4,
        },
        committedGifts: [
            {
                id: '1',
                name: 'Boat',
                isBought: true,
            },
            {
                id: '2',
                name: 'Car',
                isBought: true,
            },
        ],
    },
    {
        gifteeId: '123',
        id: '2',
        name: "Meg's 24th Birthday",
        date: '2025-03-15',
        progress: {
            giftsBought: 2,
            giftsCommitted: 3,
        },
        committedGifts: [
            {
                id: '3',
                name: 'House',
                isBought: true,
            },
            {
                id: '4',
                name: 'Bike',
                isBought: true,
            },
        ],
    },
    {
        gifteeId: '456',
        id: '1',
        name: 'Christmas 2024',
        date: '2024-12-25',
        progress: {
            giftsBought: 0,
            giftsCommitted: 1,
        },
        committedGifts: [
            {
                id: '1',
                name: 'Boat',
                isBought: false,
            },
        ],
    },
    {
        gifteeId: '789',
        id: '1',
        name: 'Christmas 2024',
        date: '2024-12-25',
        progress: {
            giftsBought: 1,
            giftsCommitted: 2,
        },
        committedGifts: [
            {
                id: '1',
                name: 'Boat',
                isBought: true,
            },
            {
                id: '2',
                name: 'Car',
                isBought: false,
            },
        ],
    },
]
