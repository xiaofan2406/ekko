import React from 'react';

class Cell extends React.Component {
  state = {
    isEditing: false,
  };

  // This is needed, because Grid passes `onChange` as an inline array func
  // This should shallow compare all props/state except `props.onChange`
  // TODO investigate how Grid can "cache" onChange, and just use PureComponent here
  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextProps.data !== this.props.data ||
  //     nextProps.editor !== this.props.editor ||
  //     nextState.isEditing !== this.state.isEditing
  //   );
  // }

  handleChange = newValue => {
    this.props.onChange(newValue);
    this.setState({
      isEditing: false,
    });
    console.log('finish editing');
  };

  render() {
    const { data, editor } = this.props;
    console.log('render Cell', this.state.isEditing, data);

    return (
      <span>
        <span
          onClick={() => {
            this.setState({
              isEditing: true,
            });
          }}
        >
          {JSON.stringify(data)}
        </span>
        {this.state.isEditing &&
          editor({
            data,
            handleChange: this.handleChange,
          })}
      </span>
    );
  }
}

export default Cell;
