import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RowData, store } from "./DiscountStore";
import { action } from "mobx";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { RiAddLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { FaDollarSign } from "react-icons/fa";
import "./App.css";

const App: React.FC = observer(() => {

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
      <h1
        style={{ color: "white", fontFamily: "roboto", marginBottom: "100px" }}
      >
        Discount calculator
      </h1>
      <div className="pricing-container">
        <div className="input-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "50%",
            }}
          >
            <label style={{ marginRight: "5px", color: "white" }}>
              Select Pricing option:
            </label>
            <IoIosInformationCircleOutline style={{ color: "white" }} />
          </div>
          <select
            value={store.priceOption}
            onChange={handleChangePriceOption}
            style={{
              width: "50%",
              height: "60%",
              border: "none",
              outline: "none",
            }}
            className="dropdown"
          >
            <option value="volume">Volume</option>
            <option value="each">Each Unit</option>
          </select>
        </div>
        <div className="input-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "50%",
            }}
          >
            <label style={{ marginRight: "5px", color: "white" }}>
              Enter Price (USD)
            </label>
            <IoIosInformationCircleOutline style={{ color: "white" }} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "50%",
              height: "60%",
              border: "1px solid #ccc",
            }}
          >
            <FaDollarSign
              style={{ color: "white", height: "15px", marginLeft: "5px" }}
            />
            <input
              type="text"
              value={store.price.toString()}
              onChange={handleChangePrice}
              style={{
                border: "none",
                flex: 1,
                marginLeft: "5px",
                outline: "none",
                height: "100%",
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          onClick={handleAddRow}
          style={{
            color: "rgba(28, 40, 84, 1)",
            display: "flex",
            alignItems: "center",
            padding: "6px 14px",
            backgroundColor: "white",
            borderRadius: "5px",
            alignSelf: "flex-end",
            fontWeight: "600",
            fontFamily: "roboto",
            fontSize: "15px",
            marginBottom: "10px",
          }}
        >
          <RiAddLine style={{ marginRight: "5px" }} /> Add row
        </button>
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
                    style={{ outline: "none" }}
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
                    style={{ outline: "none" }}
                  />
                </td>
                <td
                  style={{
                    color:
                      row.originalPrice > row.discountedPrice ? "red" : "white",
                    fontWeight: "500",
                  }}
                >
                  {row.originalPrice}
                </td>
                <td
                  style={{
                    color:
                      row.discountedPrice < row.originalPrice
                        ? "green"
                        : "white",
                    fontWeight: "500",
                  }}
                >
                  {row.discountedPrice}
                </td>
                <td>
                  {index > 0 && (
                    <button onClick={() => handleDeleteRow(index)}>
                      <AiOutlineClose style={{ color: "white" }} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default App;
