import { z } from 'zod'

function useValidation() {
    const stringErrorMsgs = {
        required_error: 'Gift name cannot be empty',
    }

    const urlErrorMsgs = {
        invalid_type_error: 'Link must be a valid URL',
    }

    const minCharsErrorMsg = {
        message: 'Gift name cannot be empty',
    }

    const maxCharsErrorMsg = {
        message: 'Gift name must be less than 50 characters',
    }

    const giftIdeaFormSchema = z
        .object({
            name: z.string(stringErrorMsgs).min(1, minCharsErrorMsg).max(50, maxCharsErrorMsg),
            link: z.string(urlErrorMsgs).trim().url().optional().or(z.literal('')),
        })
        .required()

    return giftIdeaFormSchema
}

export default useValidation
