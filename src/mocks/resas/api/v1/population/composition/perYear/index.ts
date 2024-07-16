export const response = async (prefCode: number) => {
  switch (prefCode) {
    case 1:
      return (await import('./_1')).response;
    case 2:
      return (await import('./_2')).response;
    case 3:
      return (await import('./_3')).response;
    case 4:
      return (await import('./_4')).response;
    case 5:
      return (await import('./_5')).response;
    case 6:
      return (await import('./_6')).response;
    case 7:
      return (await import('./_7')).response;
    case 8:
      return (await import('./_8')).response;
    case 9:
      return (await import('./_9')).response;
    case 10:
      return (await import('./_10')).response;
    case 11:
      return (await import('./_11')).response;
    case 12:
      return (await import('./_12')).response;
    case 13:
      return (await import('./_13')).response;
    case 14:
      return (await import('./_14')).response;
    case 15:
      return (await import('./_15')).response;
    case 16:
      return (await import('./_16')).response;
    case 17:
      return (await import('./_17')).response;
    case 18:
      return (await import('./_18')).response;
    case 19:
      return (await import('./_19')).response;
    case 20:
      return (await import('./_20')).response;
    case 21:
      return (await import('./_21')).response;
    case 22:
      return (await import('./_22')).response;
    case 23:
      return (await import('./_23')).response;
    case 24:
      return (await import('./_24')).response;
    case 25:
      return (await import('./_25')).response;
    case 26:
      return (await import('./_26')).response;
    case 27:
      return (await import('./_27')).response;
    case 28:
      return (await import('./_28')).response;
    case 29:
      return (await import('./_29')).response;
    case 30:
      return (await import('./_30')).response;
    case 31:
      return (await import('./_31')).response;
    case 32:
      return (await import('./_32')).response;
    case 33:
      return (await import('./_33')).response;
    case 34:
      return (await import('./_34')).response;
    case 35:
      return (await import('./_35')).response;
    case 36:
      return (await import('./_36')).response;
    case 37:
      return (await import('./_37')).response;
    case 38:
      return (await import('./_38')).response;
    case 39:
      return (await import('./_39')).response;
    case 40:
      return (await import('./_40')).response;
    case 41:
      return (await import('./_41')).response;
    case 42:
      return (await import('./_42')).response;
    case 43:
      return (await import('./_43')).response;
    case 44:
      return (await import('./_44')).response;
    case 45:
      return (await import('./_45')).response;
    case 46:
      return (await import('./_46')).response;
    case 47:
      return (await import('./_47')).response;
    default:
      return { message: null, result: {} };
  }
};
