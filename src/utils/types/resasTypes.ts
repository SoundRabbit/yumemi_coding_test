import * as t from 'io-ts';

export const PrefecturesResponse = t.type({
  result: t.array(
    t.type({
      prefCode: t.number,
      prefName: t.string,
    }),
  ),
});
export type PrefecturesResponse = t.TypeOf<typeof PrefecturesResponse>;

export const PopulationCategoryLabel = t.union([
  t.literal('総人口'),
  t.literal('年少人口'),
  t.literal('生産年齢人口'),
  t.literal('老年人口'),
]);
export type PopulationCategoryLabel = t.TypeOf<typeof PopulationCategoryLabel>;

export const PopulationCompositionResponse = t.type({
  result: t.type({
    boundaryYear: t.number,
    data: t.array(
      t.type({
        label: PopulationCategoryLabel,
        data: t.array(
          t.type({
            year: t.number,
            value: t.number,
          }),
        ),
      }),
    ),
  }),
});
export type PopulationCompositionResponse = t.TypeOf<typeof PopulationCompositionResponse>;
