import { useCallback } from 'react';

import { usePrefectures } from '@/hooks/usePrefectures';

import { PrefectureCheckbox } from './PrefectureCheckbox';
import styles from './index.module.scss';

export type SelectPrefecturesProps = {
  prefCodesSet: Set<number>;
  onChangeSelect: (prefCodesSet: Set<number>) => void;
};

export const SelectPrefectures = ({ prefCodesSet, onChangeSelect }: SelectPrefecturesProps) => {
  const prefectures = usePrefectures();

  const handleChange = useCallback(
    (prefCode: number, isChecked: boolean) => {
      if ((prefCodesSet.has(prefCode) && isChecked) || (!prefCodesSet.has(prefCode) && !isChecked)) return;

      const newPrefCodesSet = new Set(prefCodesSet);
      if (isChecked) {
        newPrefCodesSet.add(prefCode);
      } else {
        newPrefCodesSet.delete(prefCode);
      }
      onChangeSelect(newPrefCodesSet);
    },
    [prefCodesSet, onChangeSelect],
  );

  return (
    <ol className={styles['checkbox-list']}>
      {prefectures.map((prefecture) => (
        <li key={prefecture.prefCode}>
          <PrefectureCheckbox
            prefCode={prefecture.prefCode}
            prefName={prefecture.prefName}
            isChecked={prefCodesSet.has(prefecture.prefCode)}
            onChange={handleChange}
          />
        </li>
      ))}
    </ol>
  );
};
