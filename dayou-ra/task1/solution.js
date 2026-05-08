const data = [
    { region: 'Asia', product: 'Widget A', revenue: 4200, orders: 14 },
    { region: 'Asia', product: 'Widget B', revenue: 1800, orders: 6 },
    { region: 'Asia', product: 'Widget C', revenue: 3300, orders: 11 },
    { region: 'EU', product: 'Widget A', revenue: 3100, orders: 10 },
    { region: 'EU', product: 'Widget C', revenue: 5400, orders: 18 },
    { region: 'EU', product: 'Widget D', revenue: 920, orders: 4 },
];

const total = (data, key) => {
  let sum = 0;
  for(let i = 0; i < data.length; i++) {
    let a = data[i];
    sum += a[key];
  };
  return sum;
};

const avgOrderValue = (data) => {
  const totalRevenue = total(data, 'revenue');
  const totalOrders = total(data, 'orders');
  return Math.round((totalRevenue / totalOrders)*100) / 100
};

const topProduct = (data) => {
  const highestRevenue = (data) => {
    let highest = -Infinity;
    let index = 0;
    for(let i = 0; i < data.length; i++) {
      if (data[i].revenue > highest){
        highest = data[i].revenue;
        index = i;
      };
    };
    return index
  };
  return data[highestRevenue(data)].product
};

function groupAndAggregate(data) {
  const asiaArray = data.filter(a => a.region == 'Asia');
  const euArray = data.filter(a => a.region == 'EU');

  const asiaTotalRevenue = total(asiaArray, 'revenue')
  const euTotalRevenue = total(euArray, 'revenue')

  const asiaAvgOrderValue = avgOrderValue(asiaArray);
  const euAvgOrderValue = avgOrderValue(euArray);

  const asiaTopProduct = topProduct(asiaArray);
  const euTopProduct = topProduct(euArray);

  return {
    Asia: {
      totalRevenue: asiaTotalRevenue,
      avgOrderValue: asiaAvgOrderValue,
      topProduct: asiaTopProduct
    },
    EU: {
      totalRevenue: euTotalRevenue,
      avgOrderValue: euAvgOrderValue,
      topProduct: euTopProduct
    },
  };
};

console.log(groupAndAggregate(data));