import { makeObservable, observable, action, computed } from "mobx";

export interface RowData {
  first: number;
  last: number;
  units: number;
  discountPercentage: number;
  originalPrice: number;
  discountedPrice: number;
}

export class DiscountCalculatorStore {
  priceOption: string = "volume";
  price: number = 0;
  rows: RowData[] = [
    {
      first: 1,
      last: 1,
      units: 1,
      discountPercentage: 0,
      originalPrice: 0,
      discountedPrice: 0,
    },
  ];

  constructor() {
    makeObservable(this, {
      priceOption: observable,
      price: observable,
      rows: observable,
      addRow: action,
      deleteRow: action,
      updateRow: action,
      totalUnits: computed,
      calculateDiscountedPrices: computed,
    });
  }

  addRow = () => {
    const lastRow = this.rows[this.rows.length - 1];
    const first = lastRow ? lastRow.last + 1 : 1;
    const newRow: RowData = {
      first,
      last: first,
      units: 1,
      discountPercentage: 0,
      originalPrice: 0,
      discountedPrice: 0,
    };
    this.rows.push(newRow);
  };

  deleteRow = (index: number) => {
    this.rows.splice(index, 1);
  };

  updateRow = (index: number, key: keyof RowData, value: any) => {
    this.rows[index][key] = value;
  };

  get totalUnits() {
    return this.rows.reduce((total, row) => total + row.units, 0);
  }

  get calculateDiscountedPrices() {
    const { priceOption, price } = this;
    return this.rows.map((row) => {
      const units = row.last - row.first + 1;
      const originalPrice = priceOption === "volume" ? price : price * units;
      const discountedPrice =
        originalPrice - (originalPrice * row.discountPercentage) / 100;
      return {
        ...row,
        units,
        originalPrice,
        discountedPrice,
      };
    });
  }
}

export const store = new DiscountCalculatorStore();
