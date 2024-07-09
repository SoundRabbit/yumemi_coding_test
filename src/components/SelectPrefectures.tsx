'use client';

import { usePrefectures } from '@/hooks/usePrefectures';

export const SelectPrefectures = () => {
  const prefectures = usePrefectures();

  return (
    <div>
      {prefectures.map((prefecture) => (
        <label key={prefecture.prefCode}>
          <input type='checkbox' value={prefecture.prefCode} />
          {prefecture.prefName}
        </label>
      ))}
    </div>
  );
};
