/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
//import userEvent from "@testing-library/user-event";
import KeuzePagina from "./KeuzePagina";
import {
  TypeEindconditie,
  TypeOperator,
  TypeTelParameter,
} from "../HergebruikElementen/Types_Constanten_etc";

const dummyFunctie = () => {
  //Dummy-functie
};

describe("Keuzepagina element", () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();
  let store;

  test('renders "Keuzepagina" button Sluiten bestaat', () => {
    // Arrange
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <KeuzePagina
          eindconditie={TypeEindconditie.AANTALVRAGEN}
          initialValues={["4", "5", "6"]}
          eindconditieParameter={10}
          operator={TypeOperator.TAFELS}
          telParameter={TypeTelParameter.EENHEDEN}
          onClose={dummyFunctie}
          passData={dummyFunctie}
        />
      </Provider>
    );

    // render(
    //   <KeuzePagina
    //     eindconditie={TypeEindconditie.AANTALVRAGEN}
    //     initialValues={["4", "5", "6"]}
    //     eindconditieParameter={10}
    //     operator={TypeOperator.TAFELS}
    //     telParameter={TypeTelParameter.EENHEDEN}
    //     onClose={dummyFunctie}
    //     passData={dummyFunctie}
    //   />
    // );

    // Act
    // ... nothing

    // Assert
    const sluitenKnop = screen.getByText("Sluiten");
    expect(sluitenKnop).toBeInTheDocument();
  });
});
