const Filter = ( {value, onChange} ) => {
  return (
    <label>
    filter shown with <input value={value} onChange={onChange} />
    </label>
  )
}

export default Filter
