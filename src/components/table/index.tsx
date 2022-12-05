import { useRef } from 'react';
import { useTable } from 'react-aria';
import { useTableState } from 'react-stately';
import { Table as ChakraTable } from '@chakra-ui/react';
import { RowGroup } from './row-group';
import { HeaderRow } from './header-row';
import { SelectAllCell } from './select-all-cell';
import { ColumnHeader } from './column-header';
import { Row } from './row';
import { CheckboxCell } from './checkbox-cell';
import { Cell } from './cell';

export const Table = <T,>(
  props: {
    selectionMode?: ReturnType<
      typeof useTableState
    >['selectionManager']['selectionMode'];
    selectionBehavior?: ReturnType<
      typeof useTableState
    >['selectionManager']['selectionBehavior'];
  } & any
) => {
  const { selectionMode, selectionBehavior } = props;
  const state = useTableState({
    ...props,
    showSelectionCheckboxes:
      selectionMode === 'multiple' && selectionBehavior !== 'replace',
  });
  const ref = useRef() as Parameters<typeof useTable<T>>[2];
  const { collection } = state;
  const { gridProps } = useTable(props, state, ref);

  return (
    <ChakraTable {...gridProps}>
      <RowGroup type='head'>
        {collection.headerRows.map((headerRow) => (
          <HeaderRow key={headerRow.key} item={headerRow} state={state}>
            {[...headerRow.childNodes].map((column) =>
              column.props.isSelectionCell ? (
                <SelectAllCell key={column.key} column={column} state={state} />
              ) : (
                <ColumnHeader key={column.key} column={column} state={state} />
              )
            )}
          </HeaderRow>
        ))}
      </RowGroup>
      <RowGroup type='body'>
        {[...collection.body.childNodes].map((row) => (
          <Row key={row.key} item={row} state={state}>
            {[...row.childNodes].map((cell) =>
              cell.props.isSelectionCell ? (
                <CheckboxCell key={cell.key} cell={cell} state={state} />
              ) : (
                <Cell key={cell.key} cell={cell} state={state} />
              )
            )}
          </Row>
        ))}
      </RowGroup>
    </ChakraTable>
  );
};
