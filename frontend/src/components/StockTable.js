import React from 'react';
import PropTypes from 'prop-types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  Box
} from '@mui/material';

const StockTable = ({ stocks }) => {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: 'var(--background)', width: '100%', overflowX: 'hidden' }}>
      <Table sx={{ minWidth: 650, width: '100%', color: '#fff' }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: 'var(--background)' }}>
          <TableRow sx={{ borderTop: '1px solid rgba(68, 68, 68, 0.5)' }}>
            <TableCell sx={{ color: '#bbb', fontSize: '0.75em', textTransform: 'uppercase', borderBottom: '1px solid rgba(68, 68, 68, 0.5)', width: '2%', padding: '4px 8px', textAlign: 'left', fontWeight: 'bold' }}>#</TableCell>
            <TableCell sx={{ color: '#bbb', fontSize: '0.75em', textTransform: 'uppercase', borderBottom: '1px solid rgba(68, 68, 68, 0.5)', width: '24%', padding: '4px 8px', textAlign: 'left', fontWeight: 'bold' }}>Name</TableCell>
            <TableCell sx={{ color: '#bbb', fontSize: '0.75em', textTransform: 'uppercase', borderBottom: '1px solid rgba(68, 68, 68, 0.5)', width: '12%', padding: '4px 8px', textAlign: 'left', fontWeight: 'bold' }}>Sector</TableCell>
            <TableCell sx={{ color: '#bbb', fontSize: '0.75em', textTransform: 'uppercase', borderBottom: '1px solid rgba(68, 68, 68, 0.5)', width: '12%', padding: '4px 8px', textAlign: 'left', fontWeight: 'bold' }}>Market Cap</TableCell>
            <TableCell sx={{ color: '#bbb', fontSize: '0.75em', textTransform: 'uppercase', borderBottom: '1px solid rgba(68, 68, 68, 0.5)', width: '12%', padding: '4px 8px', textAlign: 'left', fontWeight: 'bold' }}>Mentions</TableCell>
            <TableCell sx={{ color: '#bbb', fontSize: '0.75em', textTransform: 'uppercase', borderBottom: '1px solid rgba(68, 68, 68, 0.5)', width: '12%', padding: '4px 8px', textAlign: 'left', fontWeight: 'bold' }}>Sentiment</TableCell>
            <TableCell sx={{ borderBottom: '1px solid rgba(68, 68, 68, 0.5)', width: '6%', padding: '4px 8px', textAlign: 'left' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.map((stock, index) => (
            <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#333' }, height: '48px' }}>
                {/* Above is the Hover */}
                {/* Below is the Number */}
              <TableCell sx={{ color: '#cccccc', fontSize: '0.75em', borderBottom: '1px solid rgba(68, 68, 68, 0.5)', padding: '4px 8px', width: '2%' }}>{index + 1}</TableCell>
              {/* Below is the Company name */}
              <TableCell sx={{ color: 'var(--theme-colour-text)', fontSize: '0.75em', borderBottom: '1px solid rgba(68, 68, 68, 0.5)', padding: '4px 8px', width: '24%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {stock.stockDetails?.logo && (
                    <img src={stock.stockDetails.logo} alt={`${stock.stockDetails?.name || 'Company'} logo`} style={{ marginRight: '10px', width: '20px', height: '20px', borderRadius: '50%' }} />
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 'bold' }}>{stock.stockSymbol}</span>
                    <span style={{ color: '#cccccc', fontSize: '0.65em' }}>{stock.stockDetails?.name || 'N/A'}</span>
                  </div>
                </Box>
              </TableCell>
              <TableCell sx={{ color: '#cccccc', fontSize: '0.75em', borderBottom: '1px solid rgba(68, 68, 68, 0.5)', padding: '4px 8px', width: '12%' }}>{stock.stockDetails?.finnhubIndustry || 'N/A'}</TableCell>
              <TableCell sx={{ color: '#cccccc', fontSize: '0.75em', borderBottom: '1px solid rgba(68, 68, 68, 0.5)', padding: '4px 8px', width: '12%' }}>{stock.stockDetails?.marketCap ? stock.stockDetails.marketCap.toLocaleString() : 'N/A'}</TableCell>
              <TableCell sx={{ color: '#cccccc', fontSize: '0.75em', borderBottom: '1px solid rgba(68, 68, 68, 0.5)', padding: '4px 8px', width: '12%' }}>{stock.totalNewsCount || 'N/A'}</TableCell>
              <TableCell sx={{ color: '#cccccc', fontSize: '0.75em', borderBottom: '1px solid rgba(68, 68, 68, 0.5)', padding: '4px 8px', width: '12%' }}>{stock.sentiment || 'Neutral'}</TableCell>
              <TableCell sx={{ color: '#cccccc', fontSize: '0.75em', borderBottom: '1px solid rgba(68, 68, 68, 0.5)', padding: '4px 8px', width: '6%' }}>
                <Button sx={{ backgroundColor: '#333', border: '1px solid rgba(68, 68, 68, 0.5)', color: '#fff', padding: '4px 8px', borderRadius: '5px', fontSize: '0.65em', minWidth: '60px', '&:hover': { backgroundColor: '#555' } }}>Set Alert</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

StockTable.propTypes = {
  stocks: PropTypes.arrayOf(
    PropTypes.shape({
      stockSymbol: PropTypes.string.isRequired,
      totalNewsCount: PropTypes.number.isRequired,
      stockDetails: PropTypes.shape({
        name: PropTypes.string,
        logo: PropTypes.string,
        finnhubIndustry: PropTypes.string,
        marketCap: PropTypes.number,
      }),
      sentiment: PropTypes.string,
    })
  ).isRequired,
};

export default StockTable;
