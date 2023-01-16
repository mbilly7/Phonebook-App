const Persons = ({persons, searchTerm, handleDelete}) => {
    return (
        <ul>
            {persons.filter(person => 
                person.name.toLowerCase().includes(searchTerm.toLowerCase())).map(person =>
                <li key={person.id}>
                    <div>{person.name} {person.number}</div>
                    <button onClick={(event) => handleDelete(event, person.id, person.name)}>delete</button>
                </li>
            )}
        </ul>
    )
}

export default Persons