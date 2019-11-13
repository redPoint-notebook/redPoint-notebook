import React, { Component } from "react";
import CodeCell from "./CodeCell";
import ToggleableMarkdownContainer from "./ToggleableMarkdownContainer";
import AddCodeCellButton from "../Shared/AddCodeCellButton";
import CodeCellContainer from "./CodeCellContainer";

class CellsList extends Component {
  state = {};

  render() {
    const cellContainers = this.props.cells.map((cell, index) => {
      if (cell.type === ("javascript" || "ruby" || "python")) {
        return (
          <CodeCellContainer
            language={cell.type}
            key={index}
            code={cell.code}
            onDeleteCellClick={this.props.onDeleteCellClick}
            onAddCellClick={this.props.onAddCellClick}
            cellIndex={index}
          />
        );
      } else if (cell.type === "markdown") {
        return (
          <ToggleableMarkdownContainer
            language={cell.type}
            key={index}
            code={cell.code}
            onDeleteCellClick={this.props.onDeleteCellClick}
            onAddCellClick={this.props.onAddCellClick}
            cellIndex={index}
          />
        );
      }
    });

    cellContainers.push(
      <AddCodeCellButton
        cellIndex={cellContainers.length}
        onClick={this.props.onAddCellClick}
      />
    );
    return cellContainers;
  }
}

export default CellsList;