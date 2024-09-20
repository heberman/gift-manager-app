export const transformUserData = (userData: UserData): UserSummary => {
    const { meta, giftees, holidays, holidayGiftees } = userData

    const holidaySummaries: HolidayProgressSummary[] = holidays.map((holidayMeta) => {
        const gifteeMap: Record<string, GifteeHolidayProgressSummary> = {}
        const filteredGiftees = holidayGiftees.filter(
            (giftee) => holidayMeta.id === giftee.holidayId
        )
        filteredGiftees.forEach(({ gifteeId, giftsBought, giftsCommitted }) => {
            const gifteeMeta = giftees.find((g) => g.id === gifteeId)
            if (!gifteeMeta) {
                throw new Error(`Cannot find meta for giftee id: ${gifteeId}`)
            }
            gifteeMap[gifteeMeta.name] = { giftsBought, giftsCommitted }
        })
        return {
            ...holidayMeta,
            gifteeMap,
        }
    })

    return {
        ...meta,
        giftees,
        holidays: holidaySummaries,
    }
}
