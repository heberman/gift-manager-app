import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { useState } from 'react'

type GiftIdeaTableProps = {
    giftIdeas: GiftDetails[]
    gifteeHolidays: GifteeHolidayDetails[]
    onAddClick: () => void
    handleSelectHoliday: (holidayIdx: number, giftIdx: number) => void
}

function GiftIdeaTable({
    giftIdeas,
    gifteeHolidays,
    onAddClick,
    handleSelectHoliday,
}: GiftIdeaTableProps) {
    const [selectedIdea, setSelectedIdea] = useState<number | null>(null)

    const getHolidayName = (idea: GiftDetails) => {
        for (const holiday of gifteeHolidays) {
            for (const gift of holiday.committedGifts) {
                if (gift.id === idea.id) {
                    return holiday.name
                }
            }
        }
        return undefined
    }

    const onSelectHoliday = (e: SelectChangeEvent) => {
        handleSelectHoliday(parseInt(e.target.value), selectedIdea!)
        setSelectedIdea(null)
    }

    return (
        <Paper>
            <Typography variant="h6" sx={{ p: 2 }}>
                Gift Ideas
            </Typography>
            {giftIdeas.length > 0 && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Idea name</TableCell>
                            <TableCell>Link</TableCell>
                            <TableCell>Holiday</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {giftIdeas.map((idea, ideaIdx) => {
                            const committedHoliday = getHolidayName(idea)
                            return (
                                <TableRow key={idea.id}>
                                    <TableCell>{idea.name}</TableCell>
                                    <TableCell>{idea.link}</TableCell>
                                    <TableCell>
                                        {committedHoliday ??
                                            (selectedIdea === ideaIdx ? (
                                                <FormControl fullWidth>
                                                    <InputLabel id="holiday-dropdown-label">
                                                        Holiday
                                                    </InputLabel>
                                                    <Select
                                                        labelId="holiday-dropdown-label"
                                                        label="Holiday"
                                                        value={''}
                                                        onChange={onSelectHoliday}
                                                    >
                                                        {gifteeHolidays.map(
                                                            (holiday, holidayIdx) => {
                                                                if (
                                                                    holiday.progress
                                                                        .giftsCommitted ===
                                                                    holiday.committedGifts.length
                                                                )
                                                                    return undefined
                                                                return (
                                                                    <MenuItem
                                                                        key={holiday.id}
                                                                        value={holidayIdx}
                                                                    >
                                                                        {holiday.name}
                                                                    </MenuItem>
                                                                )
                                                            }
                                                        )}
                                                    </Select>
                                                </FormControl>
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    onClick={() => setSelectedIdea(ideaIdx)}
                                                >
                                                    Commit
                                                </Button>
                                            ))}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            )}
            <Button variant="contained" onClick={onAddClick} sx={{ m: 2 }}>
                Add gift idea
            </Button>
        </Paper>
    )
}

export default GiftIdeaTable
