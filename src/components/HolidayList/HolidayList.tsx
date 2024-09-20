import { Paper, Stack, Typography } from '@mui/material'
import React from 'react'

function HolidayList({ children }: React.PropsWithChildren) {
    return (
        <Paper sx={{ p: 2, width: 560 }}>
            <Stack gap={2}>
                <Typography variant="h6">Upcoming holidays</Typography>
                {children}
            </Stack>
        </Paper>
    )
}

export default HolidayList
