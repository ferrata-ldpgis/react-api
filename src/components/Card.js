export default function Card(props) {

	const name = props.name;
    const birth_year = props.birth_year;
    const nationality = props.nationality;
    const biography = props.biography;
    const known_for = props.known_for || [];
	const image = props.image;

	return (
        <div className="card">
            <ul>
                <li className="card-title">Name: {name}</li>
                <li className="card-birth_year">Birth year: {birth_year}</li>
                <li className="card-nationality">Nationality: {nationality}</li>
                <li className="card-biography">Biography: {biography}</li>
                <li className="card-known_for">
					Most famous movies:
					<ul>
						{known_for.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</li>
            </ul>
            <img className="card-image" src={image} />
	</div>
    )
}


