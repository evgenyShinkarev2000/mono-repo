import { TriangleIcon } from "../icons/Triangle";
import * as S from "./DatePicker.styled";
import { fillByDate, getMonth } from "./utils";

type DateObject = {
    day: number;
    month: number;
    year: number;
};

type DropdownProps = {
    onSelect: (date: Date) => void;
    close: () => void;
    currentDate: DateObject;
    onDateChange: (date: DateObject | ((prev: DateObject) => DateObject)) => void;
};

export function DatePickerDropdown(props: DropdownProps) {
    const currentDate = props.currentDate;

    const dates = fillByDate(currentDate.month, currentDate.year);

    function onDateSelect(date: Date) {
        props.onDateChange({
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
        });
        props.onSelect(date);
        props.close();
    }

    function increaseByMonth() {
        if (currentDate.month === 12) {
            props.onDateChange({
                month: 1,
                year: currentDate.year + 1,
                day: currentDate.day,
            });
            return;
        }
        props.onDateChange(({ month, year, day }) => ({ month: month + 1, year, day }));
    }

    function decreaseByMonth() {
        if (currentDate.month === 1) {
            props.onDateChange({
                month: 12,
                year: currentDate.year - 1,
                day: currentDate.day,
            });
            return;
        }
        props.onDateChange(({ month, year, day }) => ({ month: month - 1, year, day }));
    }

    return (
        <S.Dropdown>
            <S.MonthPicker>
                <TriangleIcon style={{ cursor: "pointer" }} onClick={decreaseByMonth} />
                <S.DropdownDate>
                    {getMonth(currentDate.month)} {currentDate.year}
                </S.DropdownDate>
                <TriangleIcon style={{ transform: "rotate(180deg)", cursor: "pointer" }} onClick={increaseByMonth} />
            </S.MonthPicker>
            <S.Calendar>
                <S.HeadCell>Пн</S.HeadCell>
                <S.HeadCell>Вт</S.HeadCell>
                <S.HeadCell>Ср</S.HeadCell>
                <S.HeadCell>Чт</S.HeadCell>
                <S.HeadCell>Пт</S.HeadCell>
                <S.HeadCell>Сб</S.HeadCell>
                <S.HeadCell>Вс</S.HeadCell>
                {dates.map((date, i) => {
                    const day = date.getDate();
                    const disabled = (i <= 5 && day >= 20) || (i >= 30 && day <= 6) || (i >= 37 && i <= 6);
                    return (
                        <S.Cell
                            key={i}
                            disabled={disabled}
                            onClick={() => {
                                if (!disabled) {
                                    onDateSelect(date);
                                }
                            }}
                        >
                            {date.getDate()}
                        </S.Cell>
                    );
                })}
            </S.Calendar>
        </S.Dropdown>
    );
}
