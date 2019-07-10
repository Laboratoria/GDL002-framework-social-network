import React, { Component } from "react";

const DEFAULT_HEIGHT = 20;

export default class Textarea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: DEFAULT_HEIGHT,
      value: "Don't get lost in the upside down"
    };

    this.setValue = this.setValue.bind(this);
    this.setFilledTextareaHeight = this.setFilledTextareaHeight.bind(this);
  }

  componentDidMount() {
    this.mounted = true;

    this.setFilledTextareaHeight();
  }

  setFilledTextareaHeight() {
    if (this.mounted) {
      const element = this.ghost;

      this.setState({
        height: element.clientHeight
      });
    }
  }

  setValue(event) {
    this.props.onChange();
    const { value } = event.target;

    this.setState({ value });
  }

  getExpandableField() {
    const isOneLine = this.state.height <= DEFAULT_HEIGHT;
    const { height, value } = this.state;

    return (
      <div>
        <label htmlFor="textarea">Add some text...</label>
        <textarea
          type="text"
          //   onChange={this.props.onChange}
          //   value={this.props.value}
          className="textarea"
          name="textarea"
          id="textarea"
          autoFocus={true}
          defaultValue={value}
          style={{
            height,
            resize: isOneLine ? "none" : null
          }}
          onChange={this.setValue}
          onKeyUp={this.setFilledTextareaHeight}
        />
      </div>
    );
  }

  getGhostField() {
    return (
      <div
        className="textarea textarea--ghost"
        ref={c => (this.ghost = c)}
        aria-hidden="true"
      >
        {this.state.value}
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        {this.getExpandableField()}
        {this.getGhostField()}
      </div>
    );
  }
}
