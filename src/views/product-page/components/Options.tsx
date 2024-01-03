const Options = ({ attributes }: { attributes: Attribute[] }) => {
	console.log('attributes', attributes);

	return (
		<div className='flex gap-5'>
			{attributes.map(({ name, options }, index) => (
				<div key={index}>
					<h5>{name.toUpperCase()}</h5>
					<select
						id={name}
						name={name}
					>
						{options.map(({ value }, index) => (
							<option
								key={index}
								value={value}
							>
								{value.toUpperCase()}
							</option>
						))}
					</select>
				</div>
			))}
		</div>
	);
};

export default Options;
