import { Stage } from "@kanban/data/Stage";
import React, { ChangeEvent, useMemo } from "react";
import * as S from "../Checkbox/Checkbox.styled";
import { Input } from "../TextField/TextField.styled";
import { CheckMarkIcon } from "../icons";
import { CloseItem } from "../icons/CloseItem";
import { CheckListMode } from "./CheckListMode";

export type CheckListItemProps = {
  stage: Stage,
  mode: CheckListMode,
  onChange: (stage: Stage) => void,
  onRemove: () => void,
}

export const CheckListItem: React.FC<CheckListItemProps> = (props) =>
{
  const isLabelReadonly = useMemo(() => props.mode === "readonly" || props.mode === "check", [props.mode]);
  const isCheckBoxReadonly = useMemo(() => props.mode === "editNoCheck" || props.mode === "readonly", [props.mode]);
  const isRemoveDisabled = isLabelReadonly;

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) =>
  {
    if (isCheckBoxReadonly)
    {
      return;
    }
    props.onChange({
      ...props.stage,
      isCompleted: e.currentTarget.checked,
    });
  }

  const handleText = (e: ChangeEvent<HTMLInputElement>) =>
  {
    if (isLabelReadonly)
    {
      return;
    }
    props.onChange({
      ...props.stage,
      title: e.currentTarget.value,
    });
  }
  return (
    <div>
      <S.Label readonly={isLabelReadonly}>
        {
          !isCheckBoxReadonly &&
          <>
            <S.Input
              hidden
              type="checkbox"
              disabled={isCheckBoxReadonly}
              checked={props.stage.isCompleted}
              onChange={handleCheckbox}
            />
            <S.CustomCheckboxWrapper>
              <S.CustomCheckbox>
                <CheckMarkIcon />
              </S.CustomCheckbox>
            </S.CustomCheckboxWrapper>
          </>
        }
        <Input value={props.stage.title} onChange={handleText} style={{ width: "min-content" }} />
        {
          !isRemoveDisabled &&
          <CloseItem onClick={props.onRemove} />
        }
      </S.Label>
    </div>
  )
}