import Link from 'next/link';

const TopBar = () => {
	return (
		<section className='bg-secondary text-white '>
			<div className='container mx-auto flex max-w-7xl justify-between py-1'>
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
			</div>
		</section>
	);
};

export default TopBar;
