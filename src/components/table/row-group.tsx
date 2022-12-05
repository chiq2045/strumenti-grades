import { ReactNode, CSSProperties } from 'react';
import { useTableRowGroup } from 'react-aria';
import { Tbody, Thead } from '@chakra-ui/react';

export const RowGroup = ({
  type,
  children,
  style,
}: {
  type: 'body' | 'head';
  style?: CSSProperties;
  children: ReactNode;
}) => {
  const { rowGroupProps } = useTableRowGroup();

  return type === 'head' ? (
    <Thead {...rowGroupProps} style={style}>
      {children}
    </Thead>
  ) : (
    <Tbody {...rowGroupProps} style={style}>
      {children}
    </Tbody>
  );
};
