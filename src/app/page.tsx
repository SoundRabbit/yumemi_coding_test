import { PopulationChartContainer } from '@/components/organisms/PopulationChartContainer';

import styles from './page.module.scss';

const App = () => {
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <header className={styles['header']}>
          <h1 className={styles['heading']}>
            <div className={styles['heading-main']}>コーディングテスト</div>
            <div className={styles['heading-sub']}>株式会社ゆめみ</div>
          </h1>
        </header>
        <main className={styles['main']}>
          <PopulationChartContainer />
        </main>
      </div>
    </div>
  );
};

export default App;
