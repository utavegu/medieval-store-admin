// TODO: Один большой тодо. Вообще на адаптер походит, кстати.

export const getErrorMessage = (error: any) => {
  // TODO - интерфейс еррор-враппера. А может и вовсе убрать его, раз тут свой есть.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const errorMessage = error?.data?.data?.errorMessage?.message
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      error?.data?.data?.errorMessage?.message
    : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      error?.data?.data?.errorMessage;
  return JSON.stringify(errorMessage);
};
