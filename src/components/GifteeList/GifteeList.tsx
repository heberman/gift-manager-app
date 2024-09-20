import { Paper, Stack, Typography } from '@mui/material'
import GifteeCard from './GifteeCard'
import AddGifteeForm from './AddGifteeForm'

type GifteeListProps = {
    giftees: GifteeMeta[]
}

function GifteeList({ giftees }: GifteeListProps) {
    return (
        <Paper sx={{ p: 2, width: 560 }}>
            <Stack gap={2}>
                <Typography variant="h6">Giftees</Typography>
                {giftees.map((giftee) => (
                    <GifteeCard key={giftee.name} giftee={giftee} />
                ))}
                <AddGifteeForm />
            </Stack>
        </Paper>
    )
}

export default GifteeList
