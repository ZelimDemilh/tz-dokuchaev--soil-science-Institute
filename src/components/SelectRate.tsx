import React, {
  DetailedHTMLProps,
  FC,
  ReactNode,
  SelectHTMLAttributes,
} from "react";
import { IRates } from "../types/currency";

interface ISelectRate
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  rates: IRates;
}

const SelectRate: FC<ISelectRate> = ({ rates, ...props }) => {
  return (
    <select {...props}>
      {Object.keys(rates).map((rate) => (
        <option key={rate}>{rate}</option>
      ))}
    </select>
  );
};

export default SelectRate;
