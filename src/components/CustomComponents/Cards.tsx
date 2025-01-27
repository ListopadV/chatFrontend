import { FC, useState } from 'react';
import { Box } from '@mui/material';
import { Card }  from '../CustomComponents/Card';

const baseCards = [
        {
            title: 'RD SEX',
            text: 'RED RED'
        },
        {
            title: 'BL SEX',
            text: 'BLUE BLUE '
        },
        {
            title: 'PR SEX',
            text: 'PURPLE PURPLE'
        },
        {
            title: 'WH SEX',
            text: 'WHITE WHITE'
        },
        {
            title: 'YL SEX',
            text: 'YELLOW YELLOW'
        }
    ]

export const Cards = () => {
    const [index, setIndex] = useState(0);
    const [c, setC] = useState(1);
      const cards = Array.from({ length: 50 }, (_, i) => {
        const baseCard = baseCards[i % baseCards.length];
        return {
          title: `${baseCard.title} ${i + 1}`,
          text: `${baseCard.text} ${i + 1}`,
        };
      });
      const cardWidth = 220;
      const viewportWidth = window.innerWidth;
    return (
            <Box sx={{
                overflow: 'hidden',
                width: '95vw',
                margin: '100px auto'
            }}>
                <Box
                    sx={{
                    display :'flex',
                    flexDirection: 'row',
                    transition: "margin-left 0.5s ease",
                    marginLeft: `-${index}px`,
                }}>
                    {cards.map((item, index) => {
                        return (
                           <Box onClick={() => {
                                  const newMargin = cardWidth * index - viewportWidth / 2 + cardWidth / 2;
                                  setIndex(Math.max(0, newMargin));
                                  setC(index);
                                }}>
                                <Card text={item.text} title={item.title}
                                  key={index} index={index === c} />
                           </Box>
                        )
                    })}
                </Box>
            </Box>
    )
}