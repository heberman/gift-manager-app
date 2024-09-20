const API_BASE_URL = import.meta.env.VITE_API_URL

export const fetchUserData = async (userId: string): Promise<UserData> => {
    const response = await fetch(`${API_BASE_URL}/user/${userId}`)
    if (!response.ok) {
        throw new Error('Error fetching user data')
    }
    return response.json()
}

export const fetchGifteeData = async (userId: string, gifteeId: string): Promise<GifteeDetails> => {
    const response = await fetch(`${API_BASE_URL}/user/${userId}/giftee/${gifteeId}`)
    if (!response.ok) {
        throw new Error('Error fetching giftee data')
    }
    return response.json()
}

export const addNewGiftee = async (userId: string, newGiftee: NewGiftee): Promise<GifteeMeta> => {
    const response = await fetch(`${API_BASE_URL}/user/${userId}/giftee`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGiftee),
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || 'Failed to add new giftee')
    }

    return response.json()
}

export const addNewGiftIdea = async (
    userId: string,
    gifteeId: string,
    newGift: NewGift
): Promise<GiftDetails> => {
    const response = await fetch(`${API_BASE_URL}/user/${userId}/giftee/${gifteeId}/gift`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGift),
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || 'Failed to add new gift idea')
    }

    return response.json()
}
