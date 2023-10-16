type Service = () => Promise<any>;

export const getPageProps = async <T>(services: Record<string, Service>): Promise<T> => {
  const keysArray: string [] = [];
  return Promise.all(Object.entries(services).map(([key, service]) => {
    keysArray.push(key)
    return service()
  })).then((result) => result.reduce((acc, item, index) => {
      if(item){
        return {
          ...acc,
          [keysArray[index]]: item
        }
      }

      return acc;
    }, {}));
}
