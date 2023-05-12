import { useOnClickOutside } from "@kanban/hooks/useOnClickOutside";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ArrowIcon } from "../icons";
import * as S from "./DatePicker.styled";
import { DatePickerDropdown } from "./DatePickerDropdown";

type Props = {
    value: Date | null;
    onChange: (date: Date) => void;
    icon?: ReactNode;
};

function getDate(date: Date | null) {
    const noNullableDate = date ? date : new Date();
    return {
        day: noNullableDate.getDay(),
        month: noNullableDate.getMonth() + 1,
        year: noNullableDate.getFullYear(),
    };
}

export function DatePicker(props: Props) {
    const [open, setOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(getDate(props.value));
    const ref = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(ref, closeDropdown);

    useEffect(() => {
        if (props.value) {
            setCurrentDate({
                day: props.value.getDay(),
                month: props.value.getMonth() + 1,
                year: props.value.getFullYear(),
            });
        }
    }, [props.value]);

    function closeDropdown() {
        setOpen(false);
    }

    return (
        <S.Date ref={ref}>
            <div>
                <S.Subtitle>Дедлайн</S.Subtitle>
                <S.Field onClick={() => setOpen(!open)}>
                    {props.icon}
                    <p style={{ flexGrow: 1 }}>
                        {currentDate.day.toString().padStart(2, "0")}.{currentDate.month.toString().padStart(2, "0")}.
                        {currentDate.year}
                    </p>
                    <ArrowIcon style={{ transitionDuration: ".3s", transform: `rotate3d(1, 0, 0, ${open ? 180 : 0}deg)` }} />
                </S.Field>
            </div>
            {open && (
                <DatePickerDropdown
                    currentDate={currentDate}
                    onSelect={props.onChange}
                    close={closeDropdown}
                    onDateChange={setCurrentDate}
                />
            )}
        </S.Date>
    );
}
