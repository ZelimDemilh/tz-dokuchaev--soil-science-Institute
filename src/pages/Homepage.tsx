import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { uploadRates } from "../store/currency/currencyActions";
import Preloader from "../components/Preloader";
import { changeCurrency } from "../store/user/userActions";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import SelectRate from "../components/SelectRate";
import {convertCurrency} from "../helpers/convertCurrency";

const Homepage = () => {
  const { isLoading, rates } = useAppSelector((state) => state.currency);
  const { user } = useAppSelector((state) => state.user);

  const [activeCurrency, setActiveCurrency] = useState<string>( user.baseCurrency )

  const dispatch = useAppDispatch();

  const handleChangeBaseCur = (cur: string) => {
    dispatch(changeCurrency(cur));
  };

  const handleResetRates = () => {
    dispatch(uploadRates(null));
  };

  useEffect(() => {
    dispatch(uploadRates(null));
  }, [user]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="d-flex justify-content-evenly flex-column align-items-center mt-5">
      <div className="w-50 d-flex flex-column align-items-center">
        <SelectRate
          onChange={(e) => setActiveCurrency(e.target.value)}
          className="form-select"
          defaultValue={user.baseCurrency}
          rates={rates}
        />
        <div className="mt-3 d-flex justify-content-evenly w-100">
          <Button onClick={handleResetRates} typeBtn="light">
            Обновить
          </Button>
          <Button onClick={() => handleChangeBaseCur(activeCurrency)} typeBtn="light">
            Сделать основной валютой
          </Button>
          <Link className="" to="/converter">
            <Button> конвертировать </Button>
          </Link>
        </div>
      </div>
      <ul className="list-group mt-3">
        {Object.entries(rates).map(([currency, price]) => (
          <li
            key={currency}
            className={`list-group-item ${currency === "RUB" && "active"}`}
          >
            1 {activeCurrency} = {currency} {convertCurrency(1, activeCurrency, currency, rates)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
