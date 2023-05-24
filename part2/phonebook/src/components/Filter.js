const Search = ({ value, onChange }) => {
  return (
    <div>
      filter shown with: <input value={value} onChange={onChange} />
    </div>
  )
}

export default Search
