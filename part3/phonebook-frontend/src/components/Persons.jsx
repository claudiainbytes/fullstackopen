import DeleteButton from './DeleteButton'

const Persons = ({ persons, deletePerson }) => <ul>{ persons.map((person) => <li key={person.id}>{ person.name } { person.number } &nbsp; <DeleteButton deletePerson={() => deletePerson(person)}/></li> ) }</ul>

export default Persons