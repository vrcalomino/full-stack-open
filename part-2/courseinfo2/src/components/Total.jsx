const Total = (props) => {
  const total = props.parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);
  return <p>Number of exercises {total}</p>;
};

export default Total;
