import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { store, RowData } from "./DiscountStore";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { RiAddLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import "./App.css";

const App: React.FC = observer(() => {
  const [errors, setErrors] = useState<number[]>([]);
  const [success, setSuccess] = useState<string>("");
  const [priceError, setPriceError] = useState<any>("");
  const [totalOriginalCost, setTotalOriginalCost] = useState<number>(0);
  const [totalDiscountedPrice, setTotalDiscountedPrice] = useState<number>(0);

  const handleChangePriceOption = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    store.data.priceOption = event.target.value;
  };

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const newPrice = parseFloat(inputValue);
    if (!isNaN(newPrice)) {
      store.data.price = newPrice;
      if (priceError) {
        setPriceError(false);
      }
    } else {
      store.data.price = 0;
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

  const handleSubmit = () => {
    if (store.data.price === 0) {
      setPriceError(true);
    } else {
      setPriceError(false);
      validateRows();
    }
  };

  const validateRows = () => {
    const invalidRows: number[] = [];
    store.data.rows.forEach((row, index) => {
      if (row.last <= row.first) {
        invalidRows.push(index);
      }
    });
    if (invalidRows.length > 0) {
      setErrors(invalidRows);
    } else {
      setSuccess("Data Submitted successfully");
      calculateTotals();
      setErrors([]);
    }
  };

  const calculateTotals = () => {
    let totalOriginal = 0;
    let totalDiscounted = 0;
    store.calculateDiscountedPrices.forEach((row) => {
      totalOriginal += row.originalPrice;
      totalDiscounted += row.discountedPrice;
    });
    setTotalOriginalCost(totalOriginal);
    setTotalDiscountedPrice(totalDiscounted);
  };

  const renderTable = () => {
    return (
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
          {store.calculateDiscountedPrices.map((row: any, index: any) => (
            <tr key={index}>
              <td>{row.first}</td>
              <td>
                <input
                  type="text"
                  value={row.last === Infinity ? "Infinite" : row.last}
                  onChange={(e) => handleInputChange(index, "last", e)}
                  className={
                    errors.includes(index) ? "last-input error" : "last-input"
                  }
                  readOnly={row.last === Infinity}
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
                  className="discount-input"
                />
              </td>
              <td
                className={
                  row.originalPrice > row.discountedPrice
                    ? "red-price"
                    : "white-price"
                }
              >
                {row.originalPrice}
              </td>
              <td
                className={
                  row.discountedPrice < row.originalPrice
                    ? "green-price"
                    : "white-price"
                }
              >
                {row.discountedPrice}
              </td>
              <td>
                {index > 0 && (
                  <button onClick={() => handleDeleteRow(index)}>
                    <AiOutlineClose className="close-icon" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderPricingContainer = () => {
    return (
      <div className="pricing-container">
        <div className="input-container">
          <div className="input-label">
            <label>Select Pricing option:</label>
            <IoIosInformationCircleOutline className="info-icon" />
          </div>
          <select
            value={store.data.priceOption}
            onChange={handleChangePriceOption}
            className="dropdown"
          >
            <option value="volume">Volume</option>
            <option value="each">Each Unit</option>
          </select>
        </div>
        <div className="input-container">
          <div className="input-label">
            <label>Enter Price (USD)</label>
            <IoIosInformationCircleOutline className="info-icon" />
          </div>
          <input
            type="text"
            value={store.data.price.toString()}
            onChange={handleChangePrice}
            className={priceError ? "dropdown error" : "dropdown"}
          />
        </div>
      </div>
    );
  };

  const renderButtons=()=>{
    return (
      <div className="button-container">
        <button onClick={handleAddRow} className="add-row-button">
          <RiAddLine className="add-icon" /> Add row
        </button>
        <button onClick={handleSubmit} className="add-row-button">
          Submit
        </button>
      </div>
    );
  }

  return (
    <div className="discount-calculator">
      <h1 className="title">Discount calculator</h1>
      {renderPricingContainer()}
      {renderButtons()}
      {renderTable()}
      {success && (
        <>
          <p className="success">{success}</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className="success p">
              {" "}
              Original price:{" "}
              <span
                className={
                  totalOriginalCost > totalDiscountedPrice
                    ? "error-message"
                    : totalOriginalCost === totalDiscountedPrice
                    ? "p"
                    : "success"
                }
              >
                {totalOriginalCost}
              </span>
            </p>
            <p className="success p">
              Discounted price:{" "}
              <span
                className={
                  totalOriginalCost < totalDiscountedPrice
                    ? "error-message"
                    : totalOriginalCost === totalDiscountedPrice
                    ? "p"
                    : "success"
                }
              >
                {totalDiscountedPrice}
              </span>
            </p>
          </div>
        </>
      )}
      {priceError && <span className="error-message">Please enter price</span>}
    </div>
  );
});

export default App;
