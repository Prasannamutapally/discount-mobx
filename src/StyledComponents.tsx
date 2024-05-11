import styled, { css } from "styled-components";
import { IoIosInformationCircleOutline } from "react-icons/io";

export const DiscountCalculator = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: rgba(28, 40, 84, 1);
  box-sizing: border-box;
`;

export const H1 = styled.h1`
  font-family: roboto;
  color: white;
`;

export const PricingContainer = styled.div`
  margin-bottom: 30px;
  width: 34%;
`;

export const InputContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  height: 40px;
`;

export const InputLabel = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  color: white;
`;

export const InfoIcon = styled(IoIosInformationCircleOutline)`
  color: white;
`;

export const Dropdown = styled.select`
  width: 50%;
  height: 60%;
  border: none;
  outline: none;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: flex-end;
`;

export const AddRowButton = styled.button`
  color: rgba(28, 40, 84, 1);
  display: flex;
  align-items: center;
  padding: 6px 14px;
  background-color: white;
  border-radius: 5px;
  font-weight: 600;
  font-family: roboto;
  font-size: 15px;
  margin-bottom: 10px;
  margin-left: 20px;
`;

export const RedPrice = styled.td`
  color: red;
  font-weight: 500;
`;

export const GreenPrice = styled.td`
  color: green;
  font-weight: 500;
`;

export const WhitePrice = styled.td`
  color: white;
`;

export const Input = styled.input`
  outline: none;
`;

export const PriceInput = styled.input<{ priceError: boolean }>`
  outline: none;
  border: ${(props) => (props.priceError ? "2px solid red" : "white")};
`;

export const ErrorMessage = styled.span`
  color: red;
`;

export const SuccessMessage = styled.p`
  color: greenyellow;
  font-size: 20px;
  font-family: roboto;
  font-weight: 600;
  margin: 0;
  margin-bottom: 15px;
`;

export const P = styled.p`
  color: white;
  margin: 0px;
`;

export const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const Th = styled.th`
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

export const OriginalPriceTd = styled.td<{
  originalPrice: number;
  discountedPrice: number;
}>`
  border: 1px solid #ddd;
  padding: 8px;
  font-weight:600;
  text-align: center;
  color: ${(props) => {
    if (props.originalPrice === props.discountedPrice) return "white";
    else if (props.originalPrice > props.discountedPrice) return "red";
    else return "green";
  }}
`;

export const DiscountPriceTd = styled.td<{
  originalPrice: number;
  discountedPrice: number;
}>`
  border: 1px solid #ddd;
  padding: 8px;
  font-weight: 600;
  text-align: center;
  color: ${(props) => {
    if (props.originalPrice === props.discountedPrice) return "white";
    else if (props.originalPrice > props.discountedPrice) return "green";
    else return "red";
  }};
`;

export const LastTd = styled.td<{
  isError: boolean;
}>`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  color:white;

  ${(props) =>
    props.isError &&
    css`
      &:nth-child(2) input {
        border: 2px solid red;
      }
    `}
`;

export const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  color: white;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  svg {
    color: white;
  }
`;

export const ErrorPrice = styled.span`
  color: red;
`;

export const SuccessPrice = styled.span`
  color: greenyellow;
`;
