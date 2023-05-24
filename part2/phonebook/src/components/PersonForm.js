const PersonForm = ({
  onSubmit,
  valueName,
  valueNumber,
  onChangeName,
  onChangeNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={valueName} onChange={onChangeName} />
      </div>
      <div>
        number: <input value={valueNumber} onChange={onChangeNumber} />
      </div>
      <div>debug: {valueName}</div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default PersonForm
