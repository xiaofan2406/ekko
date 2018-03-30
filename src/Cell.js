import React from 'react';

class Cell extends React.PureComponent {
  state = {
    isEditing: false,
  };

  // This is needed, because Row passes `onChange` as an inline array func
  // This should shallow compare all props/state except `props.onChange`
  // TODO investigate how Row can "cache" onChange, and just use PureComponent here
  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextProps.data !== this.props.data ||
  //     nextProps.editor !== this.props.editor ||
  //     nextState.isEditing !== this.state.isEditing
  //   );
  // }

  handleChange = newValue => {
    const { onChange, handleRowChange } = this.props;

    handleRowChange(onChange(newValue));
    this.setState({
      isEditing: false,
    });
    console.log('finish editing');
  };

  render() {
    const { value, editor, handleRowChange } = this.props;
    console.log('render Cell', this.state.isEditing, value);

    return (
      <span>
        <span
          onClick={() => {
            this.setState({
              isEditing: true,
            });
          }}
        >
          {JSON.stringify(value)}
        </span>
        {this.state.isEditing &&
          editor({
            value,
            handleChange: this.handleChange,
          })}
      </span>
    );
  }
}

export default Cell;
