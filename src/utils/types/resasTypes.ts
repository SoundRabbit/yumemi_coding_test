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

export const PopulationCompositionResponse = t.type({
  result: t.type({
    boundaryYear: t.number,
    data: t.array(
      t.type({
        label: t.string,
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
