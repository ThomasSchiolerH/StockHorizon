import React from 'react';
import PropTypes from 'prop-types';
import '../styles/StockList.css';

// const StockList = ({ stocks }) => {
//   return (
//     <div className="table-container">
//       <table className="stock-list">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Sector</th>
//             <th>Market Cap</th>
//             <th>Mentions</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {stocks.map((stock, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td className="name-cell">
//                 {stock.stockDetails.logo && <img src={stock.stockDetails.logo} alt={`${stock.stockDetails.name} logo`} className="stock-logo" />}
//                 <div className="stock-name">
//                   <span className="stock-symbol">{stock.stockSymbol}</span>
//                   <span className="stock-full-name">{stock.stockDetails.name}</span>
//                 </div>
//               </td>
//               <td className="sector-cell">{stock.stockDetails.finnhubIndustry}</td>
//               <td className="market-cap-cell">{stock.stockDetails.marketCap ? stock.stockDetails.marketCap.toLocaleString() : 'N/A'}</td>
//               <td className="mentions-cell">{stock.totalNewsCount}</td>
//               <td><button className="alert-button">Set Alert</button></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };




const StockList = ({ stocks }) => {
    return (
      <div className="table-container">
        <table className="stock-list">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Sector</th>
              <th>Market Cap</th>
              <th>Mentions</th>
              <th>Sentiment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="name-cell">
                  {stock.stockDetails.logo && (
                    <img src={stock.stockDetails.logo} alt={`${stock.stockDetails.name} logo`} className="stock-logo" />
                  )}
                  <div className="stock-name">
                    <span className="stock-symbol">{stock.stockSymbol}</span>
                    <span className="stock-full-name">{stock.stockDetails.name}</span>
                  </div>
                </td>
                <td className="sector-cell">{stock.stockDetails.finnhubIndustry}</td>
                <td className="market-cap-cell">{stock.stockDetails.marketCap ? stock.stockDetails.marketCap.toLocaleString() : 'N/A'}</td>
                <td className="mentions-cell">{stock.totalNewsCount}</td>
                <td className="sentiment-cell">{stock.sentiment || 'Neutral'}</td>
                <td className="actions-cell">
                  <button className="alert-button">Set Alert</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  StockList.propTypes = {
    stocks: PropTypes.arrayOf(
      PropTypes.shape({
        stockSymbol: PropTypes.string.isRequired,
        totalNewsCount: PropTypes.number.isRequired,
        stockDetails: PropTypes.shape({
          name: PropTypes.string.isRequired,
          logo: PropTypes.string,
          finnhubIndustry: PropTypes.string,
          marketCap: PropTypes.number,
        }).isRequired,
        sentiment: PropTypes.string,
      })
    ).isRequired,
  };


// StockList.propTypes = {
//   stocks: PropTypes.arrayOf(PropTypes.shape({
//     stockSymbol: PropTypes.string.isRequired,
//     totalNewsCount: PropTypes.number.isRequired,
//     stockDetails: PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       logo: PropTypes.string,
//       finnhubIndustry: PropTypes.string,
//       marketCap: PropTypes.number,
//     }).isRequired,
//   })).isRequired,
// };

export default StockList;
