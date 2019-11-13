import React, { Component } from "react";
// import DropdownButton from "react-bootstrap/DropdownButton";
import SplitButton from "react-bootstrap/SplitButton";
import Dropdown from "react-bootstrap/Dropdown";
import uuidv4 from "uuid";

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

  capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    const dropDownItems = ["markdown", "javascript", "ruby", "python"].map(
      language => {
        return (
          <Dropdown.Item
            as="button"
            value={language}
            onClick={this.handleSetCellType}
            active={this.state.type === language ? true : false}
            key={uuidv4()}
          >
            {this.capitalize(language)}
          </Dropdown.Item>
        );
      }
    );
    const capitalizedLanguage =
      this.state.type.charAt(0).toUpperCase() + this.state.type.slice(1);
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
