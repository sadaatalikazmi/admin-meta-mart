import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

const Accordion = styled((props) => (

  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function HotProducts({ hotProducts }) {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className='hot-products'>
      <h3>Hot Products</h3>
      {hotProducts ? (
        <></>
      ) : (
        <p>No hot products available</p>
      )}
      {
        hotProducts.map((el, idx) =>
          <Accordion key={el.type} expanded={expanded === `panel${idx + 1}`} onChange={handleChange(`panel${idx + 1}`)}>
            <AccordionSummary aria-controls={`panel${idx + 1}d-content`} id={`panel${idx + 1}d-header`}>
              <Typography>{el.type}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className='hot-product-grid'>
                {el.hotProducts.map((hotProduct, index) => (
                  <div key={index} className='hot-product'>
                    <div className='ranking'>{index + 1}</div>
                    <img
                      src={hotProduct.imageUrl}
                      alt={'Image'}
                      className='product-image'
                    />
                    <div className='product-details'>
                      <h3>{hotProduct.name}</h3>
                      <ul className='list-detail'>
                          <li><b>Price: </b> <span>{hotProduct.price}</span></li>
                          <li><b>Quantity: </b> <span>{hotProduct.quantity}</span></li>
                          <li><b>Type: </b> <span>{hotProduct.type}</span></li>
                          <li><b>Orders: </b> <span>{hotProduct.totalOrders}</span></li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        )
      }
    </div>
  );
}

export default HotProducts;