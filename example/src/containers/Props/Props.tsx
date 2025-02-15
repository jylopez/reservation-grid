import React, { FC, useMemo, useCallback, MouseEvent } from 'react';

import { useMainContext } from 'context/mainContext';
import { createStartEnd } from 'utils/dateUtils';
import s from './Props.module.css';

const Props: FC = () => {

  const {
    year,
    month,
    title,
    info,
    column3,
    highlightToday,
    showInfo,
    showColumn3,
    selectedColumns,
    selectedRows,
    data,
    theme,
    locale,
  } = useMainContext();

  const { start, end } = useMemo(() => createStartEnd(+year, +month), [year, month]);

  const props = JSON.stringify({
    start,
    end,
    title,
    info,
    column3,
    highlightToday,
    showInfo,
    showColumn3,
    selectedColumns,
    selectedRows,
    data,
    theme,
    locale,
    onClickTitle: '(value) => console.log(value)',
    onClickCell: '({ value, date, dateType }) => console.log({ value, date, dateType })',
  }, null, 2);

  const showCopy = Boolean(navigator.clipboard);

  const onClickCopy = useCallback(async (event: MouseEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;

    target.classList.toggle(s.active);

    await navigator.clipboard.writeText(props);
  }, [props]);

  return (
    <div className={s.wrapper}>
      {showCopy && (
        <img
          src="copy.svg"
          alt="Copy"
          className={s.icon}
          onClick={onClickCopy}
        />
      )}
      <pre className={s.container}>
      <code>
        {props}
      </code>
    </pre>

    </div>
  );
};

export {
  Props,
};
