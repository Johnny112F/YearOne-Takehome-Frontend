function PageChangeDropDown({ handlePageChange, pageNumbers }) {
  return (
    <form className="MovieListPage-page-form">
      <label className="pages-color">Select page for results found: </label>
      <select onChange={handlePageChange}>
        {pageNumbers.map(num => {
          return <option key={num} value={num}>{num}</option>
        })}
      </select>
    </form>
  );
}

export default PageChangeDropDown;