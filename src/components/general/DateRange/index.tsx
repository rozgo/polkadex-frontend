import "react-datepicker/dist/react-datepicker.css";

import { useState } from 'react';
import DatePicker from "react-datepicker"
import { useTheme, Theme } from 'Context/ThemeContext';
import Icon from "../Icon";
import * as S from './styles'

type Props = {
  position: 'right' | 'left'
  backgroundcolor ? : any;
}
const DateRange = ( {position='right' , backgroundcolor  = 'Gray'}: Props ) => {
  const { theme, setTheme } = useTheme();
  const [state, setState] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <S.Wrapper>
      <Icon source={theme===Theme.Dark?"Transactions":"TransactionsBlack"} background={backgroundcolor} size="Medium" action={()=>setState(!state)} />
      {state &&
        <S.WrapperCalendar position={position}>
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      </S.WrapperCalendar> }

    </S.Wrapper>
  )
}

export default DateRange
