import React, { ReactElement, useState } from "react";
import * as S from "./CheckboxGroup.styled";

type Props<Item> = {
    onChange: (values: string[]) => void;
    children: ReactElement[];
};

export function CheckboxGroup<Item extends object>(props: Props<Item>) {
    const [items, setItems] = useState<string[]>([]);

    return (
        <S.CheckboxGroup>
            {React.Children.map(props.children, (child, i) =>
                React.cloneElement(child, {
                    checked: items.includes(props.children[i].props.value),
                    onToggle: (value: boolean) => {
                        const updated = [...items];
                        if (value) {
                            updated.push(props.children[i].props.value);
                        } else {
                            const index = updated.indexOf(props.children[i].props.value);
                            updated.splice(index, 1);
                        }
                        setItems(updated);
                        props.onChange(updated);
                    },
                })
            )}
        </S.CheckboxGroup>
    );
}
