import React, { useMemo } from 'react'
import { useTable, useBlockLayout } from 'react-table'
import { useSticky } from 'react-table-sticky'
import MOCK_DATA from '../MOCK_DATA.json'
import { STICKY_COLUMNS } from './columns'
import './table.css'
import { Styles } from './TableStyles'

function StickyTable() {
  const columns = useMemo(() => STICKY_COLUMNS, [])

  const data = useMemo(() => MOCK_DATA, [])

  const tableInstance = useTable({
    columns,
    data
  }, useBlockLayout, useSticky)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance

  const firstPageRows = rows.slice(0, 20)

  return (
        <Styles>
          <div {...getTableProps()} className="table sticky" style={{ width: 1000, height: 500 }}>
            <div className="header">
              {headerGroups.map((headerGroup) => (
                <div {...headerGroup.getHeaderGroupProps()} className="tr">
                  {headerGroup.headers.map((column) => (
                    <div {...column.getHeaderProps()} className="th">
                      {column.render('Header')}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div {...getTableBodyProps()} className="body">
              {firstPageRows.map((row) => {
                prepareRow(row);
                return (
                  <div {...row.getRowProps()} className="tr">
                    {row.cells.map((cell) => (
                      <div {...cell.getCellProps()} className="td">
                        {cell.render('Cell')}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </Styles>
  )
}

export default StickyTable