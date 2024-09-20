import { z } from 'zod'

function useValidation() {
    const stringErrorMsgs = {
        required_error: 'Name cannot be empty',
    }

    const minCharsErrorMsg = {
        message: 'Name cannot be empty',
    }

    const maxCharsErrorMsg = {
        message: 'Name must be less than 30 characters',
    }

    const gifteeNameFormSchema = z
        .object({
            name: z.string(stringErrorMsgs).min(1, minCharsErrorMsg).max(30, maxCharsErrorMsg),
        })
        .required()

    return gifteeNameFormSchema
}

export default useValidation
