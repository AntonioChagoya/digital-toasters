// Next
import Link from 'next/link';

// Components
import Section from '@components/Section';

const TopBar = () => {
	return (
		<Section className='bg-secondary text-white '>
			<div>
				<p></p>
			</div>

			<nav className='flex'>
				<ul className='divide-x'>
					<Link
						href='/'
						className='px-2'
					>
						Sign In
					</Link>
					<Link
						href='/toasters'
						className='px-2'
					>
						Register
					</Link>
				</ul>
			</nav>
		</Section>
	);
};

export default TopBar;
