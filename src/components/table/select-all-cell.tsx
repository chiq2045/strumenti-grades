import { useRef } from 'react';
import { useTableSelectAllCheckbox, VisuallyHidden } from 'react-aria';
import { Checkbox } from '@chakra-ui/react';
import { useTableColumnHeader } from 'react-aria';
import { Th } from '@chakra-ui/react';

export const SelectAllCell = ({
  column,
  state,
}: {
  column: Parameters<typeof useTableColumnHeader>[0]['node'];
  state: Parameters<typeof useTableColumnHeader>[1];
}) => {
  const ref = useRef() as Parameters<typeof useTableColumnHeader>[2];
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  );
  const {
    checkboxProps: { onChange, ...restCheckboxProps },
  } = useTableSelectAllCheckbox(state);

  return (
    <Th {...columnHeaderProps} ref={ref as any}>
      {state.selectionManager.selectionMode === 'single' ? (
        <VisuallyHidden>{restCheckboxProps['aria-label']}</VisuallyHidden>
      ) : (
        <Checkbox
          {...restCheckboxProps}
          onChange={(e) => {
            const { checked } = e.target;

            if (onChange) {
              onChange(checked);
            }
          }}
        />
      )}
    </Th>
  );
};
