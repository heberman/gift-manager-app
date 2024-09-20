import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'

function Shell({ children }: React.PropsWithChildren) {
    return (
        <Box sx={{ width: '100%', m: 0 }}>
            <AppBar position="sticky">
                <Toolbar sx={{ justifyContent: 'center' }}>
                    <Typography variant="h5">Gift Manager</Typography>
                </Toolbar>
            </AppBar>
            <Stack sx={{ alignItems: 'center', px: 10, py: 5 }}>{children}</Stack>
        </Box>
    )
}

export default Shell
