import { useOnClickOutside } from "@kanban/hooks/useOnClickOutside";
import { ReactNode, useRef, useState } from "react";
import { Text } from "../Text";
import { ArrowIcon } from "../icons";
import * as S from "./DatePicker.styled";
import { DatePickerDropdown } from "./DatePickerDropdown";
import { DateObject } from "./types";
import { toDateObj } from "./utils";

type Props = {
    label: string;
    value: Date | null;
    onChange: (date: Date) => void;
    icon?: ReactNode;
};



export function DatePicker(props: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const currentDate = toDateObj(props.value ?? new Date());
    useOnClickOutside(ref, closeDropdown);

    function closeDropdown() {
        setOpen(false);
    }

    function getViewDate() {
        return `${currentDate.day.toString().padStart(2, "0")}
        .${currentDate.month.toString().padStart(2, "0")}
        .${currentDate.year}`;
    }

    const handleDateObjChange = (dateObj: DateObject) => {
        const date = new Date();
        date.setFullYear(dateObj.year);
        date.setMonth(dateObj.month - 1);
        date.setDate(dateObj.day);

        props.onChange(date);
    }

    return (
        <S.Date ref={ref}>
            <div>
                <Text indent={1} type="body-5">
                    {props.label}
                </Text>
                <S.Field onClick={() => setOpen(!open)}>
                    {props.icon}
                    <Text style={{ flexGrow: 1 }} type="description-6">
                        {getViewDate()}
                    </Text>
                    <ArrowIcon style={{ transitionDuration: ".3s", transform: `rotate3d(1, 0, 0, ${open ? 180 : 0}deg)` }} />
                </S.Field>
            </div>
            {open && <DatePickerDropdown currentDate={currentDate} close={closeDropdown} onDateChange={handleDateObjChange} />}
        </S.Date>
    );
}
