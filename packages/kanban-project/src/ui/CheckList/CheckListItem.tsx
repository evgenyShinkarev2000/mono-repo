import { Stage } from "@kanban/data/Stage";
import React, { ChangeEvent } from "react";
import * as S from "../Checkbox/Checkbox.styled";
import { Input } from "../TextField/TextField.styled";
import { CheckMarkIcon } from "../icons";
import { CloseItem } from "../icons/CloseItem";

export type CheckListItemProps = {
  stage: Stage,
  isReadonly: boolean,
  onChange: (stage: Stage) => void,
  onRemove: () => void,
}

export const CheckListItem: React.FC<CheckListItemProps> = (props) =>
{
  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) =>
  {
    props.onChange({
      ...props.stage,
      isCompleted: e.currentTarget.checked,
    });
  }

  const handleText = (e: ChangeEvent<HTMLInputElement>) =>
  {
    props.onChange({
      ...props.stage,
      title: e.currentTarget.value,
    });
  }
  return (
    <div>
      <S.Label readonly={props.isReadonly}>
        <S.Input
          hidden
          type="checkbox"
          disabled={props.isReadonly}
          checked={props.stage.isCompleted}
          onChange={handleCheckbox}
        />
        <S.CustomCheckboxWrapper>
          <S.CustomCheckbox>
            <CheckMarkIcon />
          </S.CustomCheckbox>
        </S.CustomCheckboxWrapper>
        <Input value={props.stage.title} onChange={handleText} style={{ width: "min-content" }} />
        <CloseItem onClick={props.onRemove}></CloseItem>
      </S.Label>
    </div>
  )
}