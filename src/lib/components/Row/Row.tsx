import React, { FC, useCallback } from 'react';
import clsx from 'clsx';

import { DaysRange } from 'lib/interfaces/daysRange.interface';
import { useMainContext } from 'lib/context';
import { useDaysRange } from 'lib/hooks';
import { dateUtils } from 'lib/utils/dateUtils';

import { Day } from 'lib/components/Day';
import { RowProps } from './Row.interface';
import '../../tooltip.scss'

const Row: FC<RowProps> = (props) => {
  const { value, info, periods, selected, column3 } = props;

  const { start, end, locale = 'en', highlightToday, showInfo, selectedColumns, onClickTitle, onClickCell, showColumn3} = useMainContext();
  const range: DaysRange[] = useDaysRange(start, end, locale);

  const onClickTitleLocal = useCallback(() => {
    if (!onClickTitle) {
      return;
    }

    onClickTitle(value);
  }, [value, onClickTitle]);

  const onClickCellLocal = useCallback((date, dayType, periods) => () => {
    if (!onClickCell) {
      return;
    }

    onClickCell({ value, date, dayType, periods });
  }, [value, onClickCell]);

  const renderCell = (cell: DaysRange ) => {

    const isWeekend = cell.isWeekend;
    const isToday = highlightToday && cell.isToday;
    const isSelected = selected || (Array.isArray(selectedColumns) && selectedColumns.includes(cell.value));

    const className = clsx('cell', 'clickable', {
      'weekend': isWeekend,
      'today': isToday,
      'selected': isSelected,
    });

    const dayType = dateUtils.getDayType(cell.value, periods);
    const dayData = dateUtils.getDayData(cell.value, periods);
    const displayText = dateUtils.getDisplayText(cell.value, periods)

    return (
      <td
          key={cell.value}
          className={className}
          onClick={onClickCellLocal(cell.value, dayType, periods)}
          data-testid={`cell-${value}-${cell.value}`}
        >
        <div className='cell'>
          <br/>
          <Day type={dayType} />
          {displayText && 
          <div className='displaytext'>
            <div  dangerouslySetInnerHTML={ {__html: displayText} } />
          </div> 
          }
          {dayData && 
          <div className='tooltiptext'>
            <div  dangerouslySetInnerHTML={ {__html: dayData} } />
            <i></i>
          </div>
          }
        </div>
      </td>
    );
  };

  const clsTitle = clsx('title', 'clickable', 'fixed', { selected });
  const clsInfo = clsx('info', { selected });
  const clsColumn3 = clsx('column3', { selected });

  return (
    <tr data-testid={`row-${value}`}>
      <td className={clsTitle} onClick={onClickTitleLocal} data-testid={`title-${value}`}>{value}</td>
      {showInfo && (<td className={clsInfo} data-testid={`info-${value}`}>{info}</td>)}
      {showColumn3 && (<td className={clsColumn3} data-testid={`column3-${value}`}>{column3}</td>)}
      {range.map(cell => renderCell(cell))}
    </tr>
  );
};

export {
  Row,
};
