/* @flow */
import * as React from 'react';
import { Input, Button } from 'nidalee';

type TextEditorProps = {
  value: mixed,
  onUpdate: $PropertyType<EditorRender, 'onUpdate'>,
  onCancel: $PropertyType<EditorRender, 'onCancel'>,
};

const TextEditor = ({ value, onUpdate, onCancel }: TextEditorProps) => {
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
      <Button onClick={onCancel}>Cancel</Button>
      <Button
        primary
        onClick={() => {
          if (input) {
            onUpdate(input.value);
          }
        }}
      >
        Confirm
      </Button>
    </div>
  );
};

export default TextEditor;
