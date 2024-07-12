import { PopulationiChart } from '@/components/PopulationiChart';
import { SelectPrefectures } from '@/components/SelectPrefectures';

const App = () => {
  return (
    <main>
      <SelectPrefectures />
      <PopulationiChart prefCodes={[1]} categoryLabel='総人口' />
    </main>
  );
};

export default App;
