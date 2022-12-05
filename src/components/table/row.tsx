import { ReactNode, useRef } from 'react';
import { mergeProps, useFocusRing, useTableRow } from 'react-aria';
import { Tr } from '@chakra-ui/react';

export const Row = ({
  item,
  children,
  state,
}: {
  item: Parameters<typeof useTableRow>[0]['node'];
  state: Parameters<typeof useTableRow>[1];
  children: ReactNode;
}) => {
  const ref = useRef() as Parameters<typeof useTableRow>[2];
  const { rowProps } = useTableRow({ node: item }, state, ref);
  const { focusProps } = useFocusRing();

  return (
    <Tr {...mergeProps(rowProps, focusProps)} ref={ref as any}>
      {children}
    </Tr>
  );
};
