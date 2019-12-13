import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
Enzyme.configure({ adapter: new Adapter() });
import NavigationBar from "../Components/Shared/NavigationBar";

describe("test NavigationBar component", () => {
  let wrapper;
  let callback;

  beforeEach(() => {
    callback = jest.fn();
    wrapper = shallow(<NavigationBar 
    awaitingServerResponse={() => {}}
    cells={[]}
    notebookId='123abc'
    deleteAllCells={callback}
    onClearAllResults={callback}
     />);

          // awaitingServerResponse={this.awaitingServerResponse}
          // deleteAllCells={this.handleDeleteAllCells}
          // onSaveClick={this.handleSaveOrCloneClick}
          // onCloneClick={this.handleSaveOrCloneClick}
          // onLoadClick={this.handleLoadClick}
          // onRunAllClick={this.handleRunAllClick}
          // onAPISubmit={this.handleAPISubmit}
          // onToggleView={this.handleToggleView}
          // presentation={this.state.presentation}
  });

  it("initial state has no forms visible", () => {
    const initialState = {
      deleteWarningVisible: false,
      loadFormVisible: false,
      apiFormVisible: false,
      saveOrCloneFormVisible: false,
      webhookFormVisible: false,
      notebookURL: null,
      operation: null
    };
    expect(wrapper.state()).toEqual(initialState);
  });

  it("state is updated when handleToggleAPIForm is executed", () => {
    const updatedState = {
      deleteWarningVisible: false,
      loadFormVisible: false,
      apiFormVisible: true,
      saveOrCloneFormVisible: false,
      webhookFormVisible: false,
      notebookURL: null,
      operation: null
    };

    wrapper.instance().handleToggleAPIForm();
    expect(wrapper.state()).toEqual(updatedState);
  });

  it("state is updated when handleToggleSaveOrCloneForm is executed", () => {
    const updatedState = {
      deleteWarningVisible: false,
      loadFormVisible: false,
      apiFormVisible: false,
      saveOrCloneFormVisible: true,
      webhookFormVisible: false,
      notebookURL: null,
      operation: null
    };

    wrapper.instance().handleToggleSaveOrCloneForm();
    expect(wrapper.state()).toEqual(updatedState);
  });

  it("clicking API option changes apiFormVisible to true", () => {
    expect(wrapper.state().apiFormVisible).toBe(false);
    wrapper.find("#show-API").simulate("click");
    expect(wrapper.state().apiFormVisible).toBe(true);
  });

  it("clicking Webhooks option changes webhookFormVisible to true", () => {
    expect(wrapper.state().webhookFormVisible).toBe(false);
    wrapper.find("#show-webhooks").simulate("click");
    expect(wrapper.state().webhookFormVisible).toBe(true);
  });

  it("executing handleDeleteAllClick calls props.deleteAllCells", () => {
    wrapper.instance().handleDeleteAllClick({ preventDefault: () => {} });
     expect(callback.mock.calls.length).toBe(1);
  });

  it("executing handleClearAllResults calls props.onClearAllResults", () => {
    wrapper.instance().handleClearAllResults({ preventDefault: () => {} });
     expect(callback.mock.calls.length).toBe(1);
  });

  it("clicking Delete option changes deleteWarningVisible to true", () => {
    expect(wrapper.state().deleteWarningVisible).toBe(false);
    wrapper.find("#show-delete").simulate("click");
    expect(wrapper.state().deleteWarningVisible).toBe(true);    
  });

  it("clicking Delete option renders ConfirmAction", () => {
    wrapper.find("#show-delete").simulate("click");
    expect(wrapper.find("#confirm-delete-all").length).toBe(1)
  });

  it("clicking API option renders APIForm", () => {
    wrapper.find("#show-API").simulate("click");
    expect(wrapper.find("#api").length).toBe(1)
  });

  it("clicking Webhooks option renders WebhookForm", () => {
    wrapper.find("#show-webhooks").simulate("click");
    expect(wrapper.find("#webhooks").length).toBe(1)
  });
});

//   describe("handleAddSubmit and handleCancel", () => {
//     beforeEach(() => {
//       wrapper.instance().handleChange({
//         target: {
//           name: "title",
//           value: "Shoe"
//         }
//       });
//       wrapper.instance().handleChange({
//         target: {
//           name: "price",
//           value: "156000000"
//         }
//       });
//       wrapper.instance().handleChange({
//         target: {
//           name: "quantity",
//           value: "5"
//         }
//       });
//     });

//     it("handleCancel resets component state to empty", () => {
//       wrapper.instance().handleCancel();
//       expect(wrapper.state()).toEqual(initialState);
//     });

//     it("props.onSubmit is called when handleAddSubmit is executed", () => {
//       wrapper.instance().handleAddSubmit({ preventDefault: () => {} });
//       expect(callback.mock.calls.length).toBe(1);
//     });

//     it("fields reset to empty after form is submitted", () => {
//       wrapper.instance().handleAddSubmit({ preventDefault: () => {} });
//       expect(wrapper.state()).toEqual(initialState);
//     });

//     it("calls props.onSubmit with product when form is submitted", () => {
//       wrapper.instance().handleAddSubmit({ preventDefault: () => {} });
//       let product = {
//         title: "Shoe",
//         price: "156000000",
//         quantity: "5",
//         formVisible: false
//       };
//       expect(callback.mock.calls[0][0]).toEqual(product);
//     });
//   });
// });