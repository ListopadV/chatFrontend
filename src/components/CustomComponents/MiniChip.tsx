import { FC } from 'react';
import { MiniChip as MiniChipInt} from "../../types";
import { Chip } from '@mui/material';

export const MiniChip: FC<MiniChipInt> = ({ url, label, }) => {

    return (
        <>
            <Chip label={label} icon={<img src={url} width={"25"} height={"25"} style={{
                borderRadius: '50%'
            }} />} sx={{
                padding: '2px',
                '&:hover': {
                    backgroundColor: '#530b59',
                    cursor: 'pointer'
                }
            }} />
        </>
    )
}