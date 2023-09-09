import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const PricingList = styled('ul')({
  margin: 0,
  padding: 0,
  listStyle: 'none'
});

const SubscriptionCard = ({ tier, adding, handleClick }) => {
  return (
    <Card sx={{ maxWidth: '400px', pb: 2 }}>
      <CardHeader
        className='pages-banner-area'
        title={tier.title}
        titleTypographyProps={{ align: 'center', color: 'white' }}
        sx={{ backgroundColor: '' }}
      />
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'baseline',
            mb: 2
          }}>
          <Typography variant='h4' color='text.primary'>
            ${tier.price}
          </Typography>
          <Typography variant='h6' color='text.secondary'>
            /mo
          </Typography>
        </Box>

        <PricingList>
          {tier.description.map((line: string) => (
            <Typography component='li' variant='subtitle1' align='center' key={line}>
              {line}
            </Typography>
          ))}
        </PricingList>
      </CardContent>

      <CardActions sx={{ justifyContent: 'center' }}>
        <Button disabled={adding === tier.id} variant='contained' onClick={handleClick}>
          {adding === tier.id ? 'Adding to Cart' : 'Subscribe'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default SubscriptionCard;
