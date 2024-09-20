import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GiftIdeaDialog, GiftIdeaTable } from '~/components'
import { HolidayList, HolidayAccordian, GifteeGiftList } from '~/components/HolidayList'
import { getHolidayProgress } from '~/components/utils/getHolidayProgress'
import { useUser } from '~/contexts/user/hooks'
import { useFetchGifteeData } from '~/hooks'
import { initialGifteeHolidays } from '~/testData/initialGifteeHolidays'

function GifteeDetails() {
    const navigate = useNavigate()

    const user = useUser()
    if (!user) {
        throw new Error('User not found')
    }

    const { gifteeId } = useParams()
    if (!gifteeId) {
        throw new Error('Cannot find gifteeId parameter')
    }

    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [giftIdeas, setGiftIdeas] = useState<GiftDetails[]>([])
    const [holidayList, setHolidayList] = useState<GifteeHolidayDetails[]>([])

    const { giftee, isLoading, error } = useFetchGifteeData(user.id, gifteeId)

    useEffect(() => {
        if (giftee) {
            setGiftIdeas(giftee.giftIdeas)
        }
    }, [giftee, setGiftIdeas])

    const handleAddGiftIdea = (newIdea: GiftDetails) => {
        setGiftIdeas([...giftIdeas, newIdea])
    }

    const updateHoliday = (
        holidayIdx: number,
        updateFn: (holiday: GifteeHolidayDetails) => GifteeHolidayDetails
    ) => {
        setHolidayList((prevList) => {
            const newList = [...prevList]
            newList[holidayIdx] = updateFn(newList[holidayIdx])
            return newList
        })
    }

    const handleSelectHoliday = (holidayIdx: number, giftIdx: number) => {
        const giftIdea = giftIdeas[giftIdx]!
        updateHoliday(holidayIdx, (holiday) => ({
            ...holiday,
            committedGifts: [...holiday.committedGifts, { ...giftIdea, isBought: false }],
        }))
    }

    const handleGiftBought = (holidayIdx: number, giftIdx: number) => {
        updateHoliday(holidayIdx, (holiday) => {
            const newCommittedGifts = [...holiday.committedGifts]
            newCommittedGifts[giftIdx] = { ...newCommittedGifts[giftIdx], isBought: true }
            return {
                ...holiday,
                committedGifts: newCommittedGifts,
                progress: {
                    ...holiday.progress,
                    giftsBought: holiday.progress.giftsBought + 1,
                },
            }
        })
    }

    const handleGiftRemoved = (holidayIdx: number, giftIdx: number) => {
        updateHoliday(holidayIdx, (holiday) => ({
            ...holiday,
            committedGifts: holiday.committedGifts.filter((_, index) => index !== giftIdx),
        }))
    }

    useEffect(() => {
        if (giftee) {
            setGiftIdeas(giftee.giftIdeas)
            setHolidayList([
                ...initialGifteeHolidays.filter((holiday) => giftee.id === holiday.gifteeId),
            ])
        }
    }, [giftee])

    return (
        <Box sx={{ justifyContent: 'center', alignItems: 'center' }}>
            {isLoading && <CircularProgress />}
            {error && (
                <Typography variant="h5" color="error">
                    {error}
                </Typography>
            )}
            {giftee && holidayList && (
                <Stack gap={5} sx={{ width: 720 }}>
                    <Typography variant="h4">{giftee.name}</Typography>
                    <HolidayList>
                        {holidayList.map((holiday, holidayIdx) => {
                            const onGiftBought = (giftIdx: number) =>
                                handleGiftBought(holidayIdx, giftIdx)

                            const onGiftRemoved = (giftIdx: number) =>
                                handleGiftRemoved(holidayIdx, giftIdx)

                            return (
                                <HolidayAccordian
                                    key={holiday.id}
                                    holiday={holiday}
                                    totalProgress={getHolidayProgress([holiday.progress])}
                                >
                                    <GifteeGiftList
                                        giftsCommitted={holiday.progress.giftsCommitted}
                                        committedGifts={holiday.committedGifts}
                                        handleGiftBought={onGiftBought}
                                        handleGiftRemoved={onGiftRemoved}
                                    />
                                </HolidayAccordian>
                            )
                        })}
                    </HolidayList>
                    <GiftIdeaTable
                        giftIdeas={giftIdeas}
                        gifteeHolidays={holidayList}
                        onAddClick={() => setDialogOpen(true)}
                        handleSelectHoliday={handleSelectHoliday}
                    />
                    <Box>
                        <Button variant="outlined" onClick={() => navigate('/')}>
                            Back
                        </Button>
                    </Box>
                </Stack>
            )}
            <GiftIdeaDialog
                open={dialogOpen}
                gifteeId={gifteeId}
                handleClose={() => setDialogOpen(false)}
                handleAdd={handleAddGiftIdea}
            />
        </Box>
    )
}

export default GifteeDetails
