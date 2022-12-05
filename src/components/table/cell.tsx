import { useRef } from 'react';
import { mergeProps, useFocusRing, useTableCell } from 'react-aria';
import { Td } from '@chakra-ui/react';

export const Cell = ({
  cell,
  state,
}: {
  cell: Parameters<typeof useTableCell>[0]['node'];
  state: Parameters<typeof useTableCell>[1];
}) => {
  const ref = useRef() as Parameters<typeof useTableCell>[2];
  const { gridCellProps } = useTableCell({ node: cell }, state, ref);
  const { focusProps } = useFocusRing();
  const { rendered } = cell;

  return (
    <Td {...mergeProps(gridCellProps, focusProps)} ref={ref as any}>
      {rendered}
    </Td>
  );
};
