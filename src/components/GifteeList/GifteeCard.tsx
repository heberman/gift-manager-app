import { Button, Card, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

type GifteeProps = {
    giftee: GifteeMeta
}

function GifteeCard({ giftee }: GifteeProps) {
    const navigate = useNavigate()

    return (
        <Card
            sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Typography>{giftee.name}</Typography>
            <Button variant="contained" onClick={() => navigate(`/giftee/${giftee.id}`)}>
                Details
            </Button>
        </Card>
    )
}

export default GifteeCard
