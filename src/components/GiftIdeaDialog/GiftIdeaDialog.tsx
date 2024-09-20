import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from '@mui/material'
import useValidation from './useValidation'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAddGiftIdea } from '~/hooks'
import { useUser } from '~/contexts/user/hooks'

type GiftIdeaDialogProps = {
    open: boolean
    gifteeId: string
    handleClose: () => void
    handleAdd: (giftIdea: GiftDetails) => void
}

function GiftIdeaDialog({ open, gifteeId, handleClose, handleAdd }: GiftIdeaDialogProps) {
    const user = useUser()

    const { addGiftIdea, isLoading, error } = useAddGiftIdea()

    const giftIdeaFormSchema = useValidation()

    const {
        formState: { errors },
        handleSubmit,
        register,
        reset,
    } = useForm({
        resolver: zodResolver(giftIdeaFormSchema),
        mode: 'onChange',
    })

    const doSubmit = async (values: FieldValues) => {
        if (user) {
            const newGiftIdea: NewGift = {
                name: values.name,
                link: values.link === '' ? undefined : values.link,
            }
            const addedGiftIdea = await addGiftIdea(user.id, gifteeId, newGiftIdea)

            if (!error && addedGiftIdea) {
                handleAdd(addedGiftIdea)
                handleClose()
                reset()
            }
        }
    }

    const closeForm = () => {
        handleClose()
        reset()
    }

    return (
        <Dialog open={open} onClose={closeForm}>
            <DialogTitle>New gift idea</DialogTitle>
            <form onSubmit={handleSubmit(doSubmit)} noValidate autoComplete="off">
                <DialogContent>
                    <Stack gap={2} sx={{ width: 360 }}>
                        <TextField
                            required
                            error={!!errors.name?.message}
                            helperText={errors.name?.message as string | undefined}
                            label="Gift name"
                            {...register('name')}
                        />
                        <TextField
                            error={!!errors.link?.message}
                            helperText={errors.link?.message as string | undefined}
                            label="Link (optional)"
                            {...register('link')}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={isLoading}>
                        {isLoading ? <CircularProgress /> : 'Done'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default GiftIdeaDialog
