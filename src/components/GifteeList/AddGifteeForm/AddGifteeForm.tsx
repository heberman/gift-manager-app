import { Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useValidation from './useValidation'
import { useAddGiftee } from '~/hooks'
import { useUser } from '~/contexts/user/hooks'

function AddGifteeForm() {
    const gifteeNameFormSchema = useValidation()

    const user = useUser()

    const { addGiftee, isLoading } = useAddGiftee()

    const {
        formState: { errors },
        handleSubmit,
        register,
        reset,
    } = useForm({
        resolver: zodResolver(gifteeNameFormSchema),
        mode: 'onChange',
    })

    const doSubmit = async (values: FieldValues) => {
        if (user) {
            const newGiftee: NewGiftee = {
                name: values.name,
            }
            await addGiftee(user.id, newGiftee)
            reset()
        }
    }

    return (
        <Stack gap={1.5} sx={{ pt: 2 }}>
            <Typography>Add new giftee:</Typography>
            <form onSubmit={handleSubmit(doSubmit)} noValidate autoComplete="off">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}
                >
                    <TextField
                        required
                        size="small"
                        error={!!errors.name?.message}
                        helperText={errors.name?.message as string | undefined}
                        label="Name"
                        {...register('name')}
                    />
                    <Button type="submit" variant="contained" disabled={isLoading}>
                        {isLoading ? <CircularProgress /> : 'Add'}
                    </Button>
                </Box>
            </form>
        </Stack>
    )
}

export default AddGifteeForm
