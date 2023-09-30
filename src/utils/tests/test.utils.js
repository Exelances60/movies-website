import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { rootReducer } from "../../store/root-reducer";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: rootReducer, // rootReducer, azaltıcılarınızı içeren bir nesne olmalı
      preloadedState, // Başlangıç durumu (isteğe bağlı)
    }),

    ...renderOptions
  } = {}
) {
  const Wrapper = ({ children }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
