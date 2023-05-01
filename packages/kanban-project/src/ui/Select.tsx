import { useState } from "react";
import { ArrowIcon } from "src/icons";
import { CSSTransition } from "react-transition-group";
import { Main, Placeholder, SelectText, StyledSelect, Value, Values } from "./Select.styled";
import { useOnClickOutside } from "src/hooks/useOnClickOutside";
import { useRef } from "react";

type Props = {
    placeholder?: string;
    values: string[];
};

export function Select(props: Props): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");

    const mainRef = useRef<HTMLDivElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(mainRef, () => setIsOpen(false));

    return (
        <Main ref={mainRef}>
            <StyledSelect onClick={() => setIsOpen(!isOpen)} active={isOpen}>
                {selected ? <SelectText>{selected}</SelectText> : <Placeholder>{props.placeholder}</Placeholder>}
                <ArrowIcon />
            </StyledSelect>
            <CSSTransition timeout={1000} in={isOpen} unmountOnExit nodeRef={valuesRef}>
                <Values height={props.values.length * 100} ref={valuesRef}>
                    {props.values.map((x) => (
                        <Value
                            key={x}
                            onClick={() => {
                                setSelected(x);
                                setIsOpen(false);
                            }}
                        >
                            {x}
                        </Value>
                    ))}
                </Values>
            </CSSTransition>
        </Main>
    );
}
