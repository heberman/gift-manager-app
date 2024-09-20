import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    LinearProgress,
    Stack,
    Typography,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { getDateDifference } from '../utils/getDateDifference'
import React from 'react'

type HolidayCardProps = React.PropsWithChildren & {
    holiday: HolidayProgressSummary | GifteeHolidayDetails
    totalProgress: number
    handleGiftBought?: (giftIdx: number) => void
}

function HolidayAccordian({ holiday, totalProgress, children }: HolidayCardProps) {
    const { name, date } = holiday

    const timeLeft = getDateDifference(date)

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        pr: 2,
                    }}
                >
                    <Stack sx={{ width: 240, flexShrink: 0 }}>
                        <Typography variant="h6">{name}</Typography>
                        <Typography variant="subtitle1">{`${timeLeft} to go`}</Typography>
                    </Stack>
                    <Stack sx={{ width: '100%' }}>
                        <Typography variant="caption">
                            {`Holiday progress - ${Math.round(totalProgress)}%`}
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={totalProgress}
                            sx={{ height: 10, borderRadius: 2 }}
                        />
                    </Stack>
                </Box>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    )
}

export default HolidayAccordian
