import { CheckCircle as CompleteIcon, Delete as RemoveIcon } from '@mui/icons-material'
import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material'

type GifteeGiftListProps = {
    giftsCommitted: number
    committedGifts: CommittedGift[]
    handleGiftBought: (giftIdx: number) => void
    handleGiftRemoved: (giftIdx: number) => void
}

function GifteeGiftList({
    giftsCommitted,
    committedGifts,
    handleGiftBought,
    handleGiftRemoved,
}: GifteeGiftListProps) {
    return (
        <Stack divider={<Divider />}>
            {Array(giftsCommitted)
                .fill(null)
                .map((_, index) => (
                    <Stack
                        key={index}
                        direction="row"
                        sx={{
                            p: 2,
                            pr: 5,
                            alignItems: 'center',
                        }}
                    >
                        {index < committedGifts.length ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            >
                                <Typography>{committedGifts[index].name}</Typography>
                                {committedGifts[index].isBought ? (
                                    <CompleteIcon color="success" />
                                ) : (
                                    <Stack direction="row" gap={2} alignItems="center">
                                        <Button
                                            variant="contained"
                                            onClick={() => handleGiftBought(index)}
                                        >
                                            Gift bought
                                        </Button>
                                        <IconButton
                                            sx={{ p: 0 }}
                                            onClick={() => handleGiftRemoved(index)}
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                    </Stack>
                                )}
                            </Box>
                        ) : (
                            <Typography>Empty</Typography>
                        )}
                    </Stack>
                ))}
        </Stack>
    )
}

export default GifteeGiftList
