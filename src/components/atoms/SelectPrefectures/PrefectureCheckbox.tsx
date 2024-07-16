import React, { useCallback } from 'react';

import styles from './PrefectureCheckbox.module.scss';

export type PrefectureCheckboxProps = {
  prefCode: number;
  prefName: string;
  isChecked: boolean;
  onChange: (prefCode: number, isChecked: boolean) => void;
};

export const PrefectureCheckbox = ({ prefCode, prefName, isChecked, onChange }: PrefectureCheckboxProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(prefCode, e.currentTarget.checked);
    },
    [onChange, prefCode],
  );

  return (
    <label className={styles['label']}>
      <input
        type='checkbox'
        value={prefCode}
        checked={isChecked}
        onChange={handleChange}
        className={styles['checkbox']}
      />
      <span>{prefName}</span>
    </label>
  );
};
