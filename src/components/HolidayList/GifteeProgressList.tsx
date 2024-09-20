import { Box, Divider, LinearProgress, Stack, Typography } from '@mui/material'

type GifteeProgressListProps = {
    gifteeMap: Record<string, GifteeHolidayProgressSummary>
}

function GifteeProgressList({ gifteeMap }: GifteeProgressListProps) {
    const gifteeNames = Object.keys(gifteeMap)

    return (
        <Stack divider={<Divider />}>
            {gifteeNames.map((gifteeName) => {
                const { giftsBought, giftsCommitted } = gifteeMap[gifteeName]
                const progressValue = (giftsBought / giftsCommitted) * 100
                return (
                    <Stack
                        key={gifteeName}
                        direction="row"
                        sx={{
                            p: 2,
                            pr: 5,
                            alignItems: 'center',
                        }}
                    >
                        <Typography sx={{ width: 224, flexShrink: 0 }}>{gifteeName}</Typography>
                        <Stack sx={{ width: '100%' }}>
                            <Typography variant="caption">
                                {`Giftee progress - ${Math.round(progressValue)}%`}
                            </Typography>
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress
                                    variant="determinate"
                                    value={progressValue}
                                    sx={{ height: 10, borderRadius: 2 }}
                                />
                            </Box>
                        </Stack>
                    </Stack>
                )
            })}
        </Stack>
    )
}

export default GifteeProgressList
