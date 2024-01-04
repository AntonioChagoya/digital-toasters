// Next
import { useRouter } from 'next/router';

const Options = ({
	attributes,
	selectedVariant,
}: {
	attributes: Attribute[];
	selectedVariant?: IVariant | null;
}) => {
	const router = useRouter();
	const mergedVariantInfo = selectedVariant?.attributes?.variantInfo?.reduce(
		(acc, curr) => ({
			...acc,
			...curr,
		}),
		{}
	);

	return (
		<div className='flex gap-5'>
			{attributes?.length > 0 &&
				attributes?.map(({ name, options }, index) => (
					<div key={index}>
						<h5>{name.toUpperCase()}</h5>
						<select
							id={name}
							name={name}
							value={
								mergedVariantInfo
									? mergedVariantInfo[name as keyof typeof mergedVariantInfo]
									: router.query[name]
							}
							onChange={event => {
								event.preventDefault();
								const value = event.target.value;
								const query = router.query;

								router.push({
									query: { ...query, [name]: value },
								});
							}}
						>
							{options.map(({ value, description }, index) => (
								<option
									key={index}
									value={value}
								>
									{description.toUpperCase()}
								</option>
							))}
						</select>
					</div>
				))}
		</div>
	);
};

export default Options;
