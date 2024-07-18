import { useCallback } from 'react';

export type SelectPopulationCategoryProps = {
  categoryLabel: string;
  onChange: (categoryLabel: string) => void;
};

export const SelectPopulationCategory = ({ categoryLabel, onChange }: SelectPopulationCategoryProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.currentTarget.value);
    },
    [onChange],
  );

  return (
    <select value={categoryLabel} onChange={handleChange}>
      <option value='総人口'>総人口</option>
      <option value='年少人口'>年少人口</option>
      <option value='生産年齢人口'>生産年齢人口</option>
      <option value='老年人口'>老年人口</option>
    </select>
  );
};
