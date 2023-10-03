const Filter = (props) => {
  return (
    <>
      search{" "}
      <input
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
      />
    </>
  );
};
export default Filter;
