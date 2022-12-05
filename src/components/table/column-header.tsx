import { useRef } from 'react';
import { mergeProps, useFocusRing, useTableColumnHeader } from 'react-aria';
import { IconButton, Th } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

type Column = Parameters<typeof useTableColumnHeader>[0]['node'];
type State = Parameters<typeof useTableColumnHeader>[1];

export const ColumnHeader = ({
  column,
  state,
}: {
  column: Column;
  state: State;
}) => {
  const ref = useRef() as Parameters<typeof useTableColumnHeader>[2];
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  );
  const { focusProps } = useFocusRing();
  const { props: columnProps, colspan, rendered, key: columnKey } = column;

  return (
    <Th
      {...mergeProps(columnHeaderProps, focusProps)}
      colSpan={colspan}
      ref={ref as any}
    >
      {rendered}
      {columnProps.allowSorting ? (
        <span
          style={{
            visibility:
              state.sortDescriptor?.column === columnKey ? 'visible' : 'hidden',
          }}
        >
          <IconButton
            aria-label={`Sort column in ${
              state.sortDescriptor?.direction === 'ascending'
                ? 'descending'
                : 'ascending'
            } order`}
          >
            {state.sortDescriptor?.direction === 'ascending' ? (
              <ChevronDownIcon />
            ) : (
              <ChevronUpIcon />
            )}
          </IconButton>
        </span>
      ) : null}
    </Th>
  );
};
