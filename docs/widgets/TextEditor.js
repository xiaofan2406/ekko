/* @flow */
import * as React from 'react';
import { Input, Button } from 'nidalee';

type TextEditorProps = {
  value: mixed,
  handleChange: $PropertyType<EditorRender, 'handleChange'>,
};

const TextEditor = ({ value, handleChange }: TextEditorProps) => {
  let input;
  return (
    <div>
      <Input
        label="Name"
        defaultValue={value}
        innerRef={ref => {
          input = ref;
        }}
      />
      <Button
        primary
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
