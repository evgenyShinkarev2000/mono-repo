import { ReactNode, useEffect, useRef, useState } from "react";
import { Text } from "@kanban/ui/Text";
import * as S from "./DatePicker.styled";
import { getDate } from "./utils";
import { useOnClickOutside } from "@kanban/hooks/useOnClickOutside";
import { DatePickerDropdown } from "./DatePickerDropdown";
import { DateObject, DateRangeObject } from "./types";

type Props = {
    label: string;
    icon?: ReactNode;
    from: Date;
    to: Date;
    onChange: (range: DateRangeObject) => void;
};

type DropdownType = "from" | "to";

export function DateRange(props: Props) {
    const [dropdownType, setDropdownType] = useState<DropdownType | null>(null);
    const [fromDate, setFromDate] = useState<DateObject>(getDate(props.from));
    const [toDate, setToDate] = useState<DateObject>(getDate(props.to));

    const ref = useRef<HTMLDivElement | null>(null);

    useOnClickOutside(ref, closeDropdown);

    useEffect(() => {
        if (props.from) {
            setFromDate({
                day: props.from.getDate(),
                month: props.from.getMonth(),
                year: props.from.getFullYear(),
            });
        }
    }, [props.from]);

    useEffect(() => {
        if (props.to) {
            setToDate({
                day: props.to.getDate(),
                month: props.to.getMonth(),
                year: props.to.getFullYear(),
            });
        }
    }, [props.to]);

    function closeDropdown() {
        setDropdownType(null);
    }

    function getViewDate(type: DropdownType) {
        const current = type === "from" ? fromDate : toDate;
        return `${current.day.toString().padStart(2, "0")}.${current.month.toString().padStart(2, "0")}.${current.year}`;
    }

    function onSelect(type: DropdownType, date: DateObject) {
        if (type === "from") {
            props.onChange({
                from: new Date(date.year, date.month, date.day),
                to: new Date(toDate.year, toDate.month, toDate.day),
            });
            setFromDate(date);
        } else if (type === "to") {
            props.onChange({
                from: new Date(fromDate.year, fromDate.month, fromDate.day),
                to: new Date(date.year, date.month, date.day),
            });
            setToDate(date);
        }
    }

    return (
        <S.Date ref={ref}>
            <div>
                <Text indent={1} type="body-5">
                    {props.label}
                </Text>
                <S.Field style={{ cursor: "auto", width: "100%", userSelect: "all" }} ref={ref}>
                    {props.icon}
                    <S.Times>
                        <Text type="description-6">
                            <S.Time selected={dropdownType === "from"} onClick={() => setDropdownType("from")}>
                                {getViewDate("from")}
                            </S.Time>
                            <span> - </span>
                            <S.Time selected={dropdownType === "to"} onClick={() => setDropdownType("to")}>
                                {getViewDate("to")}
                            </S.Time>
                        </Text>
                    </S.Times>
                </S.Field>
            </div>
            {dropdownType === "from" && (
                <DatePickerDropdown
                    currentDate={fromDate}
                    close={closeDropdown}
                    onDateChange={(from) => onSelect("from", from)}
                />
            )}
            {dropdownType === "to" && (
                <DatePickerDropdown currentDate={toDate} close={closeDropdown} onDateChange={(to) => onSelect("to", to)} />
            )}
        </S.Date>
    );
}
