import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class DialogEditor extends React.Component {
  static propTypes = {
    data: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    open: true,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleConfirm = () => {
    if (this.input) {
      const { onChange } = this.props;
      onChange(this.input.value);
      this.handleClose();
    }
  };

  render() {
    const { data } = this.props;
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={this.state.open}
        onClose={this.handleClose}
      >
        <TextField
          label="Name"
          defaultValue={data}
          inputRef={input => {
            this.input = input;
          }}
        />
        <Button variant="raised" color="primary" onClick={this.handleConfirm}>
          Confirm
        </Button>
      </Dialog>
    );
  }
}

export default DialogEditor;
