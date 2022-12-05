import { ReactNode, useRef } from 'react';
import { mergeProps, useFocusRing, useTableHeaderRow } from 'react-aria';
import { Tr } from '@chakra-ui/react';

export const HeaderRow = ({
  item,
  state,
  children,
}: {
  item: Parameters<typeof useTableHeaderRow>[0]['node'];
  state: Parameters<typeof useTableHeaderRow>[1];
  children: ReactNode;
}) => {
  const ref = useRef() as Parameters<typeof useTableHeaderRow>[2];
  const { rowProps } = useTableHeaderRow({ node: item }, state, ref);
  const { focusProps } = useFocusRing();

  return (
    <Tr {...mergeProps(rowProps, focusProps)} ref={ref as any}>
      {children}
    </Tr>
  );
};
