
import React from 'react';
import { formatCellValue } from '../utils/tableUtils';

const TableBody = ({ data, columns }) => {
  return (
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          {columns.map(column => (
            <td key={column}>
              {formatCellValue(item[column])}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
