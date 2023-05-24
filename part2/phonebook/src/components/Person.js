const Person = ({ person, onDelete }) => {
  return (
    <>
      {person.name} {person.number}{' '}
      <button onClick={() => onDelete(person.id)}>delete</button>
      <br />
    </>
  )
}

export default Person
