/* @flow */
import * as React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

type TextEditorProps = {
  value: mixed,
  handleChange: $PropertyType<EditorRender, 'handleChange'>,
};

const TextEditor = ({ value, handleChange }: TextEditorProps) => {
  let input;
  return (
    <div>
      <TextField
        label="Name"
        defaultValue={value}
        inputRef={ref => {
          input = ref;
        }}
      />
      <Button
        variant="raised"
        color="primary"
        onClick={() => {
          if (input) {
            handleChange(input.value);
          }
        }}
      >
        Confirm
      </Button>
    </div>
  );
};

export default TextEditor;
