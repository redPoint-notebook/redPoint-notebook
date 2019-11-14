import React, { Component } from "react";
import SplitButton from "react-bootstrap/SplitButton";
import Dropdown from "react-bootstrap/Dropdown";
import * as constants from "../../Constants/constants";

class AddCodeCellButton extends Component {
  state = {
    type: this.props.defaultLanguage
  };

  handleAddCellClick = () => {
    this.props.onClick(this.props.cellIndex, this.state.type);
  };

  handleSetCellType = e => {
    this.setState({ type: e.target.value });
  };

  render() {
    const dropDownItems = constants.LANGUAGES.map(lang => {
      return (
        <Dropdown.Item
          as="button"
          value={lang}
          onClick={this.handleSetCellType}
        >
          {lang}
        </Dropdown.Item>
      );
    });

    const capitalizedLanguage = constants.capitalizeLanguage(this.state.type);

    return (
      <SplitButton
        className={this.props.soloButton ? "solo-add-cell-btn" : null}
        variant="secondary"
        id="dropdown-basic-button"
        title={`Add ${capitalizedLanguage} Cell`}
        size="sm"
        onClick={this.handleAddCellClick}
      >
        {dropDownItems}
      </SplitButton>
    );
  }
}

export default AddCodeCellButton;
