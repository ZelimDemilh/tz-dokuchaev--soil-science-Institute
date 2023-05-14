import React, {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Converter from "./pages/Converter";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { login } from "./store/user/userActions";
import Preloader from "./components/Preloader";

function App() {
  const { isLoading } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(login);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="App container">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/converter" element={<Converter />} />
      </Routes>
    </div>
  );
}

export default App;
