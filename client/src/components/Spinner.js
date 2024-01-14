const Spinner = ({ splash = "Loading..." }) => {
  return (
    <div className="text-center mt-5">
      <div
        className="spinner-border"
        role="status"
        style={{
          width: "5rem",
          height: "5rem",
        }}
      ></div>
      <h3>{splash}</h3>
    </div>
  );
};

export default Spinner;
