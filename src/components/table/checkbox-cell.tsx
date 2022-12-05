import { Key, useRef } from 'react';
import { useTableSelectionCheckbox } from 'react-aria';
import { Checkbox } from '@chakra-ui/react';
import { useTableCell } from 'react-aria';
import { Td } from '@chakra-ui/react';

export const CheckboxCell = ({
  cell,
  state,
}: {
  cell: Parameters<typeof useTableCell>[0]['node'];
  state: Parameters<typeof useTableCell>[1];
}) => {
  const ref = useRef() as Parameters<typeof useTableCell>[2];
  const { gridCellProps } = useTableCell({ node: cell }, state, ref);
  const { parentKey } = cell;
  const {
    checkboxProps: { onChange, ...restCheckboxProps },
  } = useTableSelectionCheckbox(
    {
      key: parentKey as Key,
    },
    state
  );

  return (
    <Td {...gridCellProps} ref={ref as any}>
      <Checkbox
        {...restCheckboxProps}
        onChange={(e) => {
          const { checked } = e.target;

          if (onChange) {
            onChange(checked);
          }
        }}
      />
    </Td>
  );
};
