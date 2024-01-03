// Next
import Link from 'next/link';

// Views
import Menu from '@views/header/components/Menu';
import Cart from '@views/cart';

// Components
import Section from '@components/Section';

const Actions = () => {
	return (
		<Section className='sticky z-50'>
			<div className='flex justify-between py-2'>
				<Link
					className='flex items-center'
					href={'/'}
					aria-label='Go to digitaltoasters.com'
				>
					<img
						width={120}
						src='/digital-toasters-logo.svg'
						alt=''
					/>
				</Link>

				<Menu />

				<nav className='flex'>
					<div className='flex items-center gap-5'>
						{/* <Link href={"/"} className="flex gap-2 items-center">
              <TbHeart size={25} />
            </Link> */}

						<Cart />
					</div>
				</nav>
			</div>
		</Section>
	);
};

export default Actions;
