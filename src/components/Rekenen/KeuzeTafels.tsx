import React from "react";
import ListItem from "../Layout/ListItem";

const KeuzeTafels = () => {
  const [state, setState] = React.useState<{ selections: string[] }>({
    selections: [],
  });
  const options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  function handleCheckboxChange(key: string) {
    let sel = state.selections;
    let find = sel.indexOf(key); //zoek of deze key al in vinkjesarray voorkomt
    if (find > -1) {
      //gevonden dan verwijderen om uit te vinken
      sel.splice(find, 1);
    } else {
      //niet gevonden dan toevoegen aan array van selected items
      sel.push(key);
    }

    setState({
      selections: sel,
    });
  }

  function checkboxItems() {
    return (
      <React.Fragment>
        {options.map((option) => (
          <ListItem
            autoFocus={false}
            key={option}
            text={option}
            handleOnChange={() => handleCheckboxChange(option)}
            selected={state.selections.includes(option)}
          ></ListItem>
        ))}
      </React.Fragment>
    );
  }

  return (
    //    <div className="App">
    //      <div style={{ width: '270px', overflowY: 'scroll', margin: 'auto' }}>
    //         {checkboxItems()}
    //         <p>{state.selections.toString()}</p>
    //       </div>
    //     </div>
    <div>
      {checkboxItems()}
      <p>Gekozen tafels: {state.selections.toString()}</p>
    </div>
  );
};

export default KeuzeTafels;
