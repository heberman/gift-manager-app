export function getHolidayProgress(giftProgressList: GifteeHolidayProgressSummary[]) {
    let totalGiftsBought = 0
    let totalGiftsCommitted = 0
    giftProgressList.forEach(({ giftsBought, giftsCommitted }) => {
        totalGiftsBought += giftsBought
        totalGiftsCommitted += giftsCommitted
    })

    return (totalGiftsBought / totalGiftsCommitted) * 100
}
