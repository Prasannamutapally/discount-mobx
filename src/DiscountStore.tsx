// DiscountStore.ts
import { makeObservable, observable, action, computed } from "mobx";

export interface RowData {
  first: number;
  last: number;
  units: number;
  discountPercentage: number;
}

export class DiscountCalculatorStore {
  data = {
    priceOption: "volume" as string,
    price: 0,
    rows: [
      {
        first: 1,
        last: Infinity,
        units: 1,
        discountPercentage: 0,
      },
    ] as RowData[],
  };

  constructor() {
    makeObservable(this, {
      data: observable,
      addRow: action,
      deleteRow: action,
      updateRow: action,
      totalUnits: computed,
      calculateDiscountedPrices: computed,
    });
  }

  addRow() {
    const lastRow = this.data.rows[this.data.rows.length - 1];
    const first = lastRow ? lastRow.last + 1 : 1;
    if (lastRow) {
      lastRow.last = lastRow.first + 1;
    }
    this.data.rows.push({
      first: lastRow?.first + 2 ?? 1,
      last: Infinity,
      units: 1,
      discountPercentage: 0,
    });
  }

  deleteRow(index: number) {
    if (index < this.data.rows.length-1) {
      const prevRow = this.data.rows[index - 1];
      const nextRow = this.data.rows[index + 1];
      this.data.rows.splice(index, 1);
      if (prevRow && nextRow) {
        nextRow.first = prevRow.last + 1;
      }
    } else {
      const prevRow = this.data.rows[index - 1];
      this.data.rows.splice(index, 1);
      prevRow.last = Infinity;
    }
  }

  updateRow(index: number, key: keyof RowData, value: any) {
    this.data.rows[index][key] = value;
    if (key === "last") {
      this.data.rows[index + 1]["first"] = value + 1;
    }
  }

  get totalUnits() {
    return this.data.rows.reduce((total, row) => total + row.units, 0);
  }

  get calculateDiscountedPrices() {
    const { priceOption, price } = this.data;
    return this.data.rows.map((row) => {
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
