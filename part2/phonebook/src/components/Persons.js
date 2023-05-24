import Person from './Person'

const Persons = ({ persons, onDelete }) => (
  <>
    {persons.map(person => (
      <Person key={person.id} person={person} onDelete={onDelete} />
    ))}
  </>
)

export default Persons
