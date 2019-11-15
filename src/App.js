import React, { Component } from "react";
import "antd/dist/antd.css";
import { Input, Button, List } from "antd";
import store from "./store/index";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    store.subscribe(this.handleStoreChange);
  }

  handleChange = e => {
    const action = {
      type: "change_input_value",
      value: e.target.value
    };
    store.dispatch(action);
  };
  handleStoreChange = () => {
    this.setState(store.getState());
  };
  handleAdd = () => {
    const action = {
      type: "add_todo_item"
    };
    store.dispatch(action);
  };
  onKeyup = e => {
    if (e.keyCode === 13) {
      this.handleAdd();
    }
  };
  handleDelete = index => {
    const action = {
      type: "del_todo_item",
      index
    };
    store.dispatch(action);
  };
  render() {
    return (
      <div style={{ margin: "10px 0 0 10px" }}>
        <Input
          onKeyUp={this.onKeyup}
          value={this.state.inputValue}
          onChange={this.handleChange}
          placeholder="todo info"
          style={{ width: "300px", marginRight: "10px" }}
        />
        <Button type="primary" onClick={this.handleAdd}>
          提交
        </Button>
        <List
          style={{ marginTop: "10px", width: "300px" }}
          bordered
          dataSource={this.state.list}
          renderItem={(item, i) => (
            <List.Item onClick={this.handleDelete.bind(this, i)}>
              {item}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default App;
