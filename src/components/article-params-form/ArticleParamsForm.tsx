import { clsx } from 'clsx';
import { useCallback, useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import { useOutsideClickClose } from './hooks/useOutsideClickClose';

import type { ArticleStateType, OptionType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

  const rootRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback((): void => {
    setIsOpen(false);
  }, []);

  useOutsideClickClose({ isOpen, rootRef, onClose: handleClose });

  const handleToggle = (): void => {
    setIsOpen((prev) => !prev);
  };

  const updateField = <K extends keyof ArticleStateType>(
    field: K,
    value: ArticleStateType[K]
  ): void => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formState);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <div ref={rootRef}>
      <ArrowButton isOpen={isOpen} onClick={handleToggle} />
      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>

          <Select
            title="Шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(option: OptionType) => updateField('fontFamilyOption', option)}
          />

          <RadioGroup
            title="Размер шрифта"
            name="font-size"
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            onChange={(option: OptionType) => updateField('fontSizeOption', option)}
          />

          <Select
            title="Цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={(option: OptionType) => updateField('fontColor', option)}
          />

          <Separator />

          <Select
            title="Цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={(option: OptionType) => updateField('backgroundColor', option)}
          />

          <Select
            title="Ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={(option: OptionType) => updateField('contentWidth', option)}
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
