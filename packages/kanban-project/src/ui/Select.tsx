import styles from "./Select.module.scss";
import React, { useState } from "react";
import styled from "styled-components";
import { ArrowIcon } from "src/icons";

type Props = {
    placeholder?: string;
    values: string[];
};

const Main = styled.div`
    position: relative;
    width: 248px;
`;

export function Select(props: Props): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");

    return (
        <Main>
            <div className={styles.select} onClick={() => setIsOpen(!isOpen)}>
                {selected ? (
                    <div className={styles.selectText}>{selected}</div>
                ) : (
                    <div className={styles.placeholder}>{props.placeholder}</div>
                )}
                <ArrowIcon />
            </div>
            {isOpen && (
                <div className={styles.values}>
                    {props.values.map((x) => (
                        <div
                            className={styles.value}
                            key={x}
                            onClick={() => {
                                setSelected(x);
                                setIsOpen(false);
                            }}
                        >
                            {x}
                        </div>
                    ))}
                </div>
            )}
        </Main>
    );
}
