import React from 'react';
import { Box, Chip } from '@mui/material';
import { FC} from 'react';
import { keyframes } from '@mui/system';

const moveLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const moveRight = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`;

const generateCompanies = (count: number) => {
  const companyNames = [
    'Apple', 'Microsoft', 'Google', 'Amazon', 'Tesla', 'Facebook', 'Samsung', 'IBM',
    'Intel', 'Netflix', 'Adobe', 'Oracle', 'Twitter', 'LinkedIn', 'Spotify', 'Snapchat',
    'PayPal', 'eBay', 'Cisco', 'Uber', 'Airbnb', 'Square', 'Salesforce', 'TikTok',
    'Alibaba', 'Tencent', 'Baidu', 'Zoom', 'NVIDIA', 'AMD', 'Dell', 'HP',
    'Slack', 'Shopify', 'Dropbox', 'Reddit', 'Pinterest', 'WhatsApp', 'YouTube',
    'Stripe', 'GitHub', 'Asana', 'GitLab', 'Bitbucket', 'WeChat', 'Yandex', 'Xiaomi',
    'Huawei', 'Discord', 'Signal', 'Telegram',
  ];
  const symbols = ['🍎', '🖥️', '🔍', '🛒', '🚗', '📘', '📱', '💻', '🎥', '🎧', '📊', '💡'];

  return Array.from({ length: count }, (_, index) => ({
    name: companyNames[index % companyNames.length],
    symbol: symbols[index % symbols.length],
  }));
};

const row1Companies = generateCompanies(50);
const row2Companies = generateCompanies(50).reverse();

const Aquarium: FC = () => {
  return (
    <Box
      sx={{
        margin: '50px auto',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        maxWidth: '70vw',
        gap: '20px',
        padding: '15px',
        borderRadius: '50px',
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          gap: '10px',
          width: '3000px',
          animation: `${moveLeft} 15s linear infinite`,
        }}
      >
        {row1Companies.map((company, index) => (
          <Chip
            key={`row1-${index}`}
            label={`${company.symbol} ${company.name}`}
            sx={{
              backgroundColor: 'linear-gradient(90deg, rgba(36,26,209,1) 0%, rgba(12,108,89,1) 0%, rgba(10,134,72,1) 0%, rgba(11,52,129,1) 0%, rgba(17,33,138,1) 0%, rgba(144,21,163,1) 42%, rgba(122,30,176,1) 85%)',
              color: '#333',
                '&:hover': {
                  backgroundColor: 'purple',
                    color: 'white',
                    cursor: 'pointer'
                },
              fontWeight: 'bold',
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          gap: '10px',
          width: '3000px',
          animation: `${moveRight} 15s linear infinite`,
        }}
      >
        {row2Companies.map((company, index) => (
          <Chip
            key={`row2-${index}`}
            label={`${company.symbol} ${company.name}`}
            sx={{
              backgroundColor: 'linear-gradient(90deg, rgba(36,26,209,1) 0%, rgba(12,108,89,1) 0%, rgba(10,134,72,1) 0%, rgba(11,52,129,1) 0%, rgba(17,33,138,1) 0%, rgba(144,21,163,1) 42%, rgba(122,30,176,1) 85%)',
              color: '#333',
                '&:hover': {
                  backgroundColor: 'purple',
                    color: 'white',
                    cursor: 'pointer'
                },
              fontWeight: 'bold',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Aquarium;