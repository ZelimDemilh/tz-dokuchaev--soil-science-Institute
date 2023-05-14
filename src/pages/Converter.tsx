import React, { useEffect, useState } from "react";
import { uploadRates } from "../store/currency/currencyActions";
import Preloader from "../components/Preloader";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import SelectRate from "../components/SelectRate";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { convertCurrency } from "../helpers/convertCurrency";
import { activeRate } from "../types/currency";

const Converter = () => {
  const { isLoading, rates } = useAppSelector((state) => state.currency);
  const { baseCurrency } = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  const [fromCurrency, setFromCurrency] = useState<activeRate>({
    currency: baseCurrency,
    count: 1,
  });
  const [toCurrency, setToCurrency] = useState<activeRate>({
    currency: "RUB",
    count: rates["RUB"],
  });
  const [result, setResult] = useState<number>(fromCurrency.count * toCurrency.count)

  console.log("1: " + fromCurrency.count)
  console.log("2: " + toCurrency.count)

  const ConverterSwap = () => {
    let tempFromCurrency: activeRate= fromCurrency
    let tempToCurrency: activeRate = toCurrency

    setFromCurrency(tempToCurrency);
    setToCurrency(tempFromCurrency);
  };

  useEffect(() => {
    setToCurrency((prev) => ({
      ...prev,
      count: rates[toCurrency.currency],
    }));
  }, [rates, toCurrency.currency]);

  useEffect(() => {
    dispatch(uploadRates(null));
  }, []);

  useEffect(() => {
    const convert = convertCurrency(
        fromCurrency.count,
        fromCurrency.currency,
        toCurrency.currency,
        rates
    )
    setResult(convert)
  }, [fromCurrency.count, fromCurrency.currency, toCurrency.currency, rates]);

  const handleCountFromCurrency = (inputValue: string) => {
    const regex = /^-?[0-9.]+$/;
    if(inputValue === ""){
      setFromCurrency((pre) => {
        return { ...pre, count: 0 };
      });
    }
    if (regex.test(inputValue)) {
      setFromCurrency((pre) => {
        return { ...pre, count: +inputValue };
      });
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex">
        <input
          className="form-control me-1"
          value={fromCurrency.count}
          onChange={(e) => handleCountFromCurrency(e.target.value)}
        />
        <SelectRate
          onChange={(e) =>
            setFromCurrency((pre) => {
              return { ...pre, currency: e.target.value };
            })
          }
          className="form-select me-2"
          value={fromCurrency.currency}
          aria-label="Default select example"
          rates={rates}
        />
        <Button typeBtn="light" onClick={ConverterSwap}>
          <i className="bi bi-arrow-left-right"></i>
        </Button>
        <SelectRate
          onChange={(e) =>
            setToCurrency((pre) => {
              return { ...pre, currency: e.target.value };
            })
          }
          className="form-select ms-2"
          value={toCurrency.currency}
          aria-label="Default select example"
          rates={rates}
        />
        <input
          className="form-control ms-1"
          value={result}
          readOnly={true}
        />
      </div>

      <Link className="mt-3" to="/">
        <Button> Вернуться на главную </Button>
      </Link>
    </div>
  );
};

export default Converter;
