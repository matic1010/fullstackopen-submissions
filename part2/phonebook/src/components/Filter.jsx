const Filter = ({ onChange, filter }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={onChange}></input>
    </div>
  );
};

export default Filter;
