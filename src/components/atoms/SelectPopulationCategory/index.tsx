import { useCallback } from 'react';

import { PopulationCategoryLabel } from '@/utils/types/resasTypes';

import styles from './index.module.scss';

export type SelectPopulationCategoryProps = {
  categoryLabel: PopulationCategoryLabel;
  onChange: (categoryLabel: PopulationCategoryLabel) => void;
};

export const SelectPopulationCategory = ({ categoryLabel, onChange }: SelectPopulationCategoryProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const categoryLabel = PopulationCategoryLabel.decode(e.currentTarget.value);
      if (categoryLabel._tag === 'Right') {
        onChange(categoryLabel.right);
      }
    },
    [onChange],
  );

  return (
    <div className={styles['container']}>
      <select value={categoryLabel} onChange={handleChange} className={styles['select']}>
        <option value='総人口' data-checked={categoryLabel === '総人口'} className={styles['select-option']}>
          総人口
        </option>
        <option value='年少人口' data-checked={categoryLabel === '年少人口'} className={styles['select-option']}>
          年少人口
        </option>
        <option
          value='生産年齢人口'
          data-checked={categoryLabel === '生産年齢人口'}
          className={styles['select-option']}
        >
          生産年齢人口
        </option>
        <option value='老年人口' data-checked={categoryLabel === '老年人口'} className={styles['select-option']}>
          老年人口
        </option>
      </select>
      <div className={styles['arrow']}>&#x25BC;</div>
    </div>
  );
};
