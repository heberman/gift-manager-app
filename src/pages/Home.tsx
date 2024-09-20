import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { GifteeList } from '~/components'
import { HolidayList, HolidayAccordian, GifteeProgressList } from '~/components/HolidayList'
import { getHolidayProgress } from '~/components/utils/getHolidayProgress'
import { useFetchUserData } from '~/hooks'

function Home() {
    const { user, isLoading: isUserLoading, error: userError } = useFetchUserData('123')

    return (
        <Box sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            {isUserLoading && <CircularProgress />}
            {userError && (
                <Typography variant="h5" color="error">
                    {userError}
                </Typography>
            )}
            {user && (
                <Stack gap={5} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Typography noWrap variant="h4">
                        Welcome to your gift dashboard!
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            gap: 5,
                        }}
                    >
                        <HolidayList>
                            {user.holidays.map((holiday) => {
                                return (
                                    <HolidayAccordian
                                        key={holiday.id}
                                        holiday={holiday}
                                        totalProgress={getHolidayProgress(
                                            Object.values(holiday.gifteeMap)
                                        )}
                                    >
                                        <GifteeProgressList gifteeMap={holiday.gifteeMap} />
                                    </HolidayAccordian>
                                )
                            })}
                        </HolidayList>
                        <GifteeList giftees={user.giftees} />
                    </Box>
                </Stack>
            )}
        </Box>
    )
}

export default Home
