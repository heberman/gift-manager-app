type UserMeta = {
    id: string
    email: string
}

// Home page summary data for user
type UserSummary = UserMeta & {
    giftees: GifteeMeta[]
    holidays: HolidayProgressSummary[]
}

// Data returned from Lambda
type UserData = {
    meta: UserMeta
    giftees: GifteeMeta[]
    holidays: HolidayMeta[]
    holidayGiftees: HolidayGifteeMeta[]
}

type NewGiftee = {
    name: string
    birthday?: string // YYYY-MM-DD
}

type GifteeMeta = NewGiftee & {
    id: string
}

type GifteeDetails = GifteeMeta & {
    giftIdeas: GiftDetails[]
}

type GifteeHolidayProgressSummary = {
    giftsBought: number
    giftsCommitted: number
}

type NewGift = {
    name: string
    link?: string
}

type GiftDetails = NewGift & {
    id: string
}

type CommittedGift = GiftDetails & {
    isBought: boolean
}

type HolidayMeta = {
    id: string
    name: string
    date: string // must be YYYY-MM-DD format
}

type HolidayProgressSummary = HolidayMeta & {
    gifteeMap: Record<string, GifteeHolidayProgressSummary> // map of giftee names to their holiday gift progress
}

type GifteeHolidayDetails = HolidayMeta & {
    gifteeId: string
    progress: GifteeHolidayProgressSummary
    committedGifts: CommittedGift[]
}

type HolidayGifteeMeta = {
    holidayId: string
    gifteeId: string
    giftsBought: number
    giftsCommitted: number
}

/* 
DDB Strategy:
PK: UserID

model: UserMeta
SK: META

model: GiteeMeta = GM
SK: GM#gifteeId
values: id, name, birthday, etc.

model: GiftDetails = GD
SK: GD#gifteeId#GIFT#giftId
values: id, gifteeId, name, link, etc.

model: HolidayMeta = HM
SK: HM#holidayId
values: id, name, date, etc.

model: HolidayGifteeMeta = HGM
SK: HGM#holidayId#GIFTEE#gifteeId
values: id, gifteeId, giftsBought, giftsCommitted, etc.

model: HolidayGiftDetails = HGD
SK: HGD#holidayId#GIFTEE#gifteeId#GIFT#giftId
values: id, gifteeId, giftId, isBought, etc.

*/
