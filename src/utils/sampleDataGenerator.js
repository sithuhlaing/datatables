
const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Design', 'Finance', 'Operations'];
const firstNames = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Edward', 'Fiona', 'George', 'Helen', 'Ivan', 'Julia', 'Kevin', 'Laura', 'Mike', 'Nancy'];
const lastNames = ['Doe', 'Smith', 'Johnson', 'Brown', 'Wilson', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin'];

const generateRandomDate = (start, end) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const generateRandomSalary = (min = 45000, max = 120000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomAge = (min = 22, max = 65) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomPhone = () => {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const exchange = Math.floor(Math.random() * 900) + 100;
  const number = Math.floor(Math.random() * 9000) + 1000;
  return `+1-${areaCode}-${exchange.toString().substring(0, 3)}-${number}`;
};

export const generateSampleData = (count = 20) => {
  return Array.from({ length: count }, (_, index) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];

    return {
      id: index + 1,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      age: generateRandomAge(),
      department,
      salary: generateRandomSalary(),
      startDate: generateRandomDate(new Date(2020, 0, 1), new Date()),
      isActive: Math.random() > 0.2, // 80% chance of being active
      phone: generateRandomPhone(),
      position: `${department} Specialist`,
      location: ['New York', 'San Francisco', 'Chicago', 'Austin', 'Seattle'][Math.floor(Math.random() * 5)]
    };
  });
};
