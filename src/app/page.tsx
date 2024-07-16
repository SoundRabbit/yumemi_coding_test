import { PopulationChartContainer } from '@/components/molecules/PopulationChartContainer';

import styles from './page.module.scss';

const App = () => {
  return (
    <div className={styles['page-container']}>
      <div className={styles['page-content']}>
        <header className={styles['header']}>
          <h1 className={styles['header-heading']}>コーディングテスト | 株式会社ゆめみ</h1>
        </header>
        <main className={styles['main']}>
          <PopulationChartContainer />
        </main>
      </div>
    </div>
  );
};

export default App;
