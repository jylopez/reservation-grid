import React, { FC, useState } from 'react';
import { Theme, LocaleKey, Row } from '@daminort/reservation-grid';

import { MainProvider, initialValue } from 'context/mainContext';

import { Grid } from 'containers/Grid';
import { Header } from 'containers/Header';
import s from './App.module.css';

const App: FC = () => {

  const [year, setYear] = useState<number>(initialValue.year);
  const [month, setMonth] = useState<number>(initialValue.month);

  const [title, setTitle] = useState<string>(initialValue.title);
  const [info, setInfo] = useState<string>(initialValue.info);

  const [highlightToday, setHighlightToday] = useState<boolean>(initialValue.highlightToday);
  const [showInfo, setShowInfo] = useState<boolean>(initialValue.showInfo);

  const [selectedColumns, setSelectedColumns] = useState<string[]>(initialValue.selectedColumns);
  const [selectedRows, setSelectedRows] = useState<string[]>(initialValue.selectedRows);

  const [theme, setTheme] = useState<Theme>(initialValue.theme);
  const [locale, setLocale] = useState<LocaleKey>(initialValue.locale);

  const [data, setData] = useState<Row[]>(initialValue.data);

  const contextValue = {
    year,
    month,
    highlightToday,
    showInfo,
    title,
    info,
    selectedColumns,
    selectedRows,
    theme,
    locale,
    data,

    onChangeYear: setYear,
    onChangeMonth: setMonth,
    onChangeHighlightToday: setHighlightToday,
    onChangeShowInfo: setShowInfo,

    onChangeTitle: setTitle,
    onChangeInfo: setInfo,

    onChangeSelectedColumns: setSelectedColumns,
    onChangeSelectedRows: setSelectedRows,

    onChangeTheme: setTheme,
    onChangeLocale: setLocale,

    onChangeData: setData,
  }

  return (
    <MainProvider value={contextValue}>
      <div className={s.container}>
        <Header />
        <Grid />
      </div>
    </MainProvider>
  );
}

export {
  App,
};
