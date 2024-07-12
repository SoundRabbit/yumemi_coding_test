import { PopulationChart } from '@/components/PopulationChart';
import { SelectPrefectures } from '@/components/SelectPrefectures';

const App = () => {
  return (
    <main>
      <SelectPrefectures />
      <PopulationChart prefCodes={[1]} categoryLabel='総人口' />
    </main>
  );
};

export default App;
