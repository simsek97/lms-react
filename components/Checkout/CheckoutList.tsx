import Typography from '@mui/material/Typography';
import { motion, useIsPresent } from 'framer-motion';

const CheckoutList = ({ id, tier, title, price, description, onRemove }) => {
  const isPresent = useIsPresent();

  const anitmations = {
    style: {
      position: isPresent ? 'static' : 'absolute'
    },
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 }
  };

  return (
    //@ts-ignore
    <motion.li className='single-cart-list d-flex justify-content-between align-items-center' layout {...anitmations}>
      <div className='single-cart-content d-flex align-items-center'>
        <div className='single-cart-contents'>
          <h3>Subscription to</h3>
          <h4>{title} License</h4>
          <hr />
          {description.map((line: string) => (
            <Typography key={line} component='li' variant='subtitle1'>
              {line}
            </Typography>
          ))}
        </div>
      </div>

      <div className='prw'>
        <h4>${price}/mo</h4>

        <div className='wis-rem d-flex align-items-center'>
          <button onClick={() => onRemove(id)} className='remove'>
            <i className='bx bxs-trash'></i> Remove
          </button>
        </div>
      </div>
    </motion.li>
  );
};

export default CheckoutList;
