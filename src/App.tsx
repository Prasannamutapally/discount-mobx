import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RowData, store } from "./DiscountStore";
import { action } from "mobx";

const App: React.FC = observer(() => {
  useEffect(() => {
    // No need to call store.calculateDiscountedPrices() here
  }, []);

  const handleChangePriceOption = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    store.priceOption = event.target.value;
  };

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const newPrice = parseFloat(inputValue);
    if (!isNaN(newPrice)) {
      store.price = newPrice;
    } else {
      store.price = 0;
    }
  };

  const handleAddRow = () => {
    store.addRow();
  };

  const handleDeleteRow = (index: number) => {
    store.deleteRow(index);
  };

  const handleInputChange = (
    index: number,
    key: keyof RowData,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    const newInputValue = parseFloat(inputValue);
    if (!isNaN(newInputValue)) {
      store.updateRow(index, key, newInputValue);
    } else {
      store.updateRow(index, key, 0);
    }
  };

  return (
    <div className="discount-calculator">
      <h1>Discount calculator</h1>
      <div className="container">
        <div className="input-container">
          <label>Pricing option:</label>
          <select value={store.priceOption} onChange={handleChangePriceOption}>
            <option value="volume">Volume</option>
            <option value="each">Each Unit</option>
          </select>
        </div>
        <div className="input-container">
          <label>Price (USD):</label>
          <input
            type="text"
            value={store.price.toString()} // Convert price to string for input value
            onChange={handleChangePrice}
          />
        </div>
      </div>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>First</th>
              <th>Last</th>
              <th>Total Units</th>
              <th>Discount Percentage (%)</th>
              <th>Original Price</th>
              <th>Discounted Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {store.calculateDiscountedPrices.map((row, index) => (
              <tr key={index}>
                <td>{row.first}</td>
                <td>
                  <input
                    type="text"
                    value={row.last}
                    onChange={(e) => handleInputChange(index, "last", e)}
                  />
                </td>
                <td>{row.units}</td>
                <td>
                  <input
                    type="text"
                    value={row.discountPercentage}
                    onChange={(e) =>
                      handleInputChange(index, "discountPercentage", e)
                    }
                  />
                </td>
                <td>{row.originalPrice}</td>
                <td>{row.discountedPrice}</td>
                <td>
                  {index > 0 && (
                    <button onClick={() => handleDeleteRow(index)}>
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleAddRow}>Add row</button>
      </div>
    </div>
  );
});

export default App;
