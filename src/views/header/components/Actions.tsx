// Next
import Link from 'next/link';

// Libs
import { TbHeart } from 'react-icons/tb';

// Components
import Menu from '@views/header/components/Menu';
import Cart from '@views/cart';

const Actions = () => {
	return (
		<section className='sticky z-50 px-4'>
			<div className='container mx-auto flex max-w-7xl justify-between py-2'>
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
		</section>
	);
};

export default Actions;
