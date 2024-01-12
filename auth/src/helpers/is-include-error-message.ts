export const isIncludeErrorMessage = (response: any, message: string): boolean => {
  try {
    const { errors } = JSON.parse(response.text);

    const isInclude = errors.some((error: any) => error.message === message);
    if (!isInclude) {
      console.error(`Expected error message: ${message},\n but got: ${JSON.stringify(errors)}`);
    }

    return isInclude;
  } catch (err) {
    console.error(err);
    return false;
  }
};
