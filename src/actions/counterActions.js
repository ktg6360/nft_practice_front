const increment = () => {
  return {
    type: "INCREMENT"
  };
};

const decrement = () => {
  return {
    type: "DECREMENT"
  };
};

const options = { increment, decrement };

export default options;
