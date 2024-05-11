import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { store, RowData } from "./DiscountStore";
import { RiAddLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import * as Styled from "./StyledComponents";

const {
  DiscountCalculator,
  PricingContainer,
  InputContainer,
  InputLabel,
  InfoIcon,
  Dropdown,
  ButtonContainer,
  AddRowButton,
  Input,
  ErrorMessage,
  SuccessMessage,
  P,
  Table,
  H1,
  Th,
  CloseButton,
  PriceInput,
  Td,
  OriginalPriceTd,
  DiscountPriceTd,
  LastTd,
} = Styled;

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
    setErrors([]);
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
      <Table>
        <thead>
          <tr>
            <Th>First</Th>
            <Th>Last</Th>
            <Th>Total Units</Th>
            <Th>Discount Percentage (%)</Th>
            <Th>Original Price</Th>
            <Th>Discounted Price</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {store.calculateDiscountedPrices.map((row: any, index: any) => (
            <tr key={index}>
              <Td>{row.first}</Td>
              <LastTd isError={errors.includes(index)}>
                <Input
                  type="text"
                  value={row.last === Infinity ? "Infinite" : row.last}
                  onChange={(e) => handleInputChange(index, "last", e)}
                  readOnly={row.last === Infinity}
                />
              </LastTd>
              <Td>{row.units}</Td>
              <Td>
                <Input
                  type="text"
                  value={row.discountPercentage}
                  onChange={(e) =>
                    handleInputChange(index, "discountPercentage", e)
                  }
                />
              </Td>
              <OriginalPriceTd
                originalPrice={row.originalPrice}
                discountedPrice={row.discountedPrice}
              >
                {row.originalPrice}
              </OriginalPriceTd>
              <DiscountPriceTd
                originalPrice={row.originalPrice}
                discountedPrice={row.discountedPrice}
              >
                {row.discountedPrice}
              </DiscountPriceTd>
              <Td>
                {index > 0 && (
                  <CloseButton onClick={() => handleDeleteRow(index)}>
                    <AiOutlineClose />
                  </CloseButton>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const renderPricingContainer = () => {
    return (
      <PricingContainer>
        <InputContainer>
          <InputLabel>
            <label>Select Pricing option:</label>
            <InfoIcon />
          </InputLabel>
          <Dropdown
            value={store.data.priceOption}
            onChange={handleChangePriceOption}
          >
            <option value="volume">Volume</option>
            <option value="each">Each Unit</option>
          </Dropdown>
        </InputContainer>
        <InputContainer>
          <InputLabel>
            <label>Enter Price (USD)</label>
            <InfoIcon />
          </InputLabel>
          <PriceInput
            type="text"
            value={store.data.price.toString()}
            onChange={handleChangePrice}
            priceError={priceError}
          />
        </InputContainer>
      </PricingContainer>
    );
  };

  const renderButtons = () => {
    return (
      <ButtonContainer>
        <AddRowButton onClick={handleAddRow}>
          <RiAddLine /> Add row
        </AddRowButton>
        <AddRowButton onClick={handleSubmit}>Submit</AddRowButton>
      </ButtonContainer>
    );
  };

  return (
    <DiscountCalculator>
      <H1>Discount calculator</H1>
      {renderPricingContainer()}
      {renderButtons()}
      {renderTable()}
      {success && (
        <>
          <SuccessMessage>{success}</SuccessMessage>
          <P>Original price: {totalOriginalCost}</P>
          <P>Discounted price: {totalDiscountedPrice}</P>
        </>
      )}
      {priceError && <ErrorMessage>Please enter price</ErrorMessage>}
    </DiscountCalculator>
  );
});

export default App;
