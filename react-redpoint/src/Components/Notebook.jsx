import React, { Component } from "react";
import CellsList from "./Cells/CellsList";

class Notebook extends Component {
  state = {
    defaultLanguage: "javascript",
    cells: [
      { type: "javascript", code: "console.log('hello');" },
      { type: "javascript", code: "console.log('hello from cell 2');" },
      { type: "markdown", code: "# I'm markdown!!\n- indent " }
    ]
  };

  handleDeleteCellClick = index => {
    this.setState(prevState => {
      const newCells = [...prevState.cells];
      newCells.splice(index, 1);
      return { cells: newCells };
    });
  };

  handleAddCellClick = (index, language = this.state.defaultLanguage) => {
    this.setState(prevState => {
      const newCells = [...prevState.cells];
      console.log("New Cells: ", newCells);
      newCells.splice(index, 0, {
        type: language,
        code: ""
      });
      return { cells: newCells };
    });
  };

  render() {
    return (
      <div>
        <CellsList
          onDeleteCellClick={this.handleDeleteCellClick}
          onAddCellClick={this.handleAddCellClick}
          cells={this.state.cells}
        />
      </div>
    );
  }
}

export default Notebook;

// DEMO:
// cells: [
//   { type: "markdown", code: "##Title" },
// { type: "javascript", code: "console.log('hello');" }
// ]

{
  /* <ul>
          <h4>Websocket Response: {this.state.response}</h4>
        </ul> */
}

// componentDidMount() {
//   ws = new WebSocket("ws://localhost:8000");
//   ws.onopen = event => {
//     // receiving the message from server
//     let currentCell = 0;
//     ws.onmessage = message => {
//       message = JSON.parse(message.data);
//       console.log(message.data);
//       console.log(message.type);

//       switch (message.type) {
//         case "stdout":
//           this.setState({ response: message.data });
//           break;
//         default:
//           console.log("No stdout received");
//       }
//     };
//   };

//   const test = () => {
//     let fakeCode = ["const a = 150\nconst b = 100\n console.log(a + b)"];
//     const json = JSON.stringify(fakeCode);
//     ws.send(json);
//   };

//   setTimeout(test, 1000);
// }