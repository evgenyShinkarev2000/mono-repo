import { Stage } from "@kanban/data/Stage";
import { Text } from "@kanban/ui/Text";
import React, { useMemo } from "react";
import * as S from "../Checkbox/CheckboxGroup.styled";
import { PlusInsideBoxIcon } from "../icons";
import { CheckListItem } from "./CheckListItem";
import { CheckListMode } from "./CheckListMode";

export type CheckListProps = {
  value: Stage[],
  onChange: (stages: Stage[]) => void,
  mode: CheckListMode,
}

export const CheckList: React.FC<CheckListProps> = (props) =>
{
  const isRemoveDisabled = useMemo(() => props.mode === "check" || props.mode === "readonly", [props.mode]);
  const isAddDisabled = useMemo(() => props.mode === "check" || props.mode === "readonly", [props.mode]);

  const handleChange = (stage: Stage, index: number) =>
  {
    const newStages = [...props.value];
    newStages[index] = stage;
    props.onChange(newStages);
  }

  const handleAdd = () =>
  {
    if (isAddDisabled)
    {
      return;
    }
    const newStages = [...props.value];
    newStages.push({ isCompleted: false, title: "" });
    props.onChange(newStages);
  }

  const handleRemove = (index: number) =>
  {
    if (isRemoveDisabled)
    {
      return;
    }
    const newStages = [...props.value];
    newStages.splice(index, 1);
    props.onChange(newStages);
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <Text type="body-5">Чек лист</Text>
        {
          !isAddDisabled &&
          <PlusInsideBoxIcon
            onClick={handleAdd}
            style={{ cursor: "pointer" }}
          />
        }

      </div>
      <S.CheckboxGroup>
        {
          props.value.map((stage, i) =>
            <CheckListItem
              mode={props.mode}
              key={i}
              stage={stage}
              onChange={(stage) => handleChange(stage, i)}
              onRemove={() => handleRemove(i)}
            />)
        }
      </S.CheckboxGroup>
    </div>
  )
}