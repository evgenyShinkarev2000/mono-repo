import { useState } from "react";

import { CSSTransition } from "react-transition-group";
import { Main, Placeholder, SelectText, StyledSelect, Value, Values } from "./Select.styled";
import { useRef } from "react";
import { useOnClickOutside } from "@kanban/hooks/useOnClickOutside";
import { ArrowIcon } from "@kanban/ui/icons/Arrow";


type Props<T> = {
    placeholder?: string;
    items: Array<T>,
    titleSelector: (item: T) => string,
    onSelect: (index: number) => void,
    selectedIndex: number,
    resetTitle?: string,
};

export function Select<T>(props: Props<T>): JSX.Element
{
    const [isOpen, setIsOpen] = useState(false);
    const mainRef = useRef<HTMLDivElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(mainRef, () => setIsOpen(false));

    return (
        <Main ref={mainRef}>
            <StyledSelect onClick={() => setIsOpen(!isOpen)} active={isOpen}>
                {props.selectedIndex >= 0 ? <SelectText>{props.titleSelector(props.items[props.selectedIndex])}</SelectText> : <Placeholder>{props.placeholder}</Placeholder>}
                <ArrowIcon />
            </StyledSelect>
            <CSSTransition timeout={1000} in={isOpen} unmountOnExit nodeRef={valuesRef}>
                <Values height={(props.items.length + (props.resetTitle ? 1 : 0)) * 100} ref={valuesRef}>
                    {
                        props.resetTitle &&
                        <Value onClick={() => props.onSelect(-1)}>{props.resetTitle}</Value>
                    }
                    {props.items.map((item, index) => (
                        <Value
                            key={index}
                            onClick={() =>
                            {
                                setIsOpen(false);
                                props.onSelect(index);
                            }}
                        >
                            {props.titleSelector(item)}
                        </Value>
                    ))}
                </Values>
            </CSSTransition>
        </Main>
    );
}
