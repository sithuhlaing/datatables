
import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const DataTableContent = ({
  data,
  columns,
  getSortInfo,
  handleSort,
  columnFilters,
  updateColumnFilter,
  clearColumnFilter,
  moveColumn
}) => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <TableHeader
          columns={columns}
          getSortInfo={getSortInfo}
          handleSort={handleSort}
          columnFilters={columnFilters}
          updateColumnFilter={updateColumnFilter}
          clearColumnFilter={clearColumnFilter}
          moveColumn={moveColumn}
        />
        <TableBody
          data={data}
          columns={columns}
        />
      </table>
    </div>
  );
};

export default DataTableContent;
