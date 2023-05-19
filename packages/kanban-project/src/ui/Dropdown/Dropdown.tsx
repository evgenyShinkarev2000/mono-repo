import { ReactNode, useState } from "react";

import { CSSTransition } from "react-transition-group";
import { Main, Placeholder, StyledSelect, Values } from "./Dropdown.styled";
import { useRef } from "react";
import { useOnClickOutside } from "@kanban/hooks/useOnClickOutside";
import { ArrowIcon } from "@kanban/ui/icons/Arrow";

type Props<T, Id> = {
    placeholder?: string;
    data: T[];
    idAccessor: (item: T) => Id;
    onSelect: (item: T) => void;
    selectedId: Id | null;
    selectedConverter: (item: T) => ReactNode;
    dataConverter: (item: T) => ReactNode;
    selectFirst?: boolean;
    closeAfterSelect?: boolean;
};

export function Dropdown<T, Id extends string | number | null>(props: Props<T, Id>): JSX.Element {
    const { closeAfterSelect = true } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<Id | null>(
        props.selectFirst && props.data.length !== 0 ? props.idAccessor(props.data[0]) : null
    );

    const mainRef = useRef<HTMLDivElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(mainRef, () => setIsOpen(false));

    const selectedItem = props.data.find((x) => props.idAccessor(x) === selectedId);

    function onSelect(item: T) {
        setSelectedId(props.idAccessor(item));
        props.onSelect(item);
        if (closeAfterSelect) setIsOpen(false);
    }

    return (
        <Main ref={mainRef}>
            <StyledSelect onClick={() => setIsOpen(!isOpen)} active={isOpen}>
                {selectedId && selectedItem ? (
                    props.selectedConverter(selectedItem)
                ) : (
                    <Placeholder>{props.placeholder}</Placeholder>
                )}
                <ArrowIcon style={{ transitionDuration: ".3s", transform: `rotate3d(1, 0, 0, ${isOpen ? 180 : 0}deg` }} />
            </StyledSelect>
            <CSSTransition timeout={1000} in={isOpen} unmountOnExit nodeRef={valuesRef}>
                <Values height={props.data.length * 100} ref={valuesRef}>
                    {props.data.map((x) => (
                        <div onClick={() => onSelect(x)} key={props.idAccessor(x)}>
                            {props.dataConverter(x)}
                        </div>
                    ))}
                </Values>
            </CSSTransition>
        </Main>
    );
}
