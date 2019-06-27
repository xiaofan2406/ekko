import React from 'react';
import faker from 'faker';

faker.locale = 'en_AU';

export const fakeUsers = number =>
  Object.fromEntries(
    [...Array(number).keys()].map(() => {
      const id = faker.random.uuid();
      return [
        id,
        {
          id,
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          companyName: faker.company.companyName(),
          email: faker.internet.email(),
          phoneNumber: faker.phone.phoneNumber(),
          credit: Math.floor(Math.random() * 100000000000),
          address: {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.stateAbbr(),
            postcode: faker.address.zipCode(),
            country: 'Australia',
          },
          lastLogin: faker.date.recent(),
        },
      ];
    })
  );

const DataContext = React.createContext();
const DataChangeContext = React.createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = React.useState(() => fakeUsers(4));

  // const addData = React.useCallback(() => {
  //   setData(prev => {
  //     const newUsers = fakeUsers(1);
  //     return { ...prev, ...newUsers };
  //   });
  // }, []);

  const onChange = React.useCallback(patch => {
    setData(prev => {
      return { ...prev, ...patch };
    });
  }, []);

  // const value = React.useMemo(
  //   () => ({
  //     data,
  //     addData,
  //     onChange,
  //   }),
  //   [data]
  // );
  console.log('DataProvider');

  return (
    <DataContext.Provider value={data}>
      <DataChangeContext.Provider value={onChange}>
        {children}
      </DataChangeContext.Provider>
    </DataContext.Provider>
  );
};

export const DataConsumer = DataContext.Consumer;

export const useData = () => {
  return React.useContext(DataContext);
};

export const useDataChange = () => {
  return React.useContext(DataChangeContext);
};

export default DataContext;
