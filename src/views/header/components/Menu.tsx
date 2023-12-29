import Link from 'next/link';
import {
	TbPaperBag,
	TbCategory2,
	TbFlame,
	TbBuildingStore,
} from 'react-icons/tb';

const Menu = () => {
	return (
		<nav className='hidden gap-5 py-4 lg:flex'>
			<Link href={'/products'}>
				<div className='flex flex-col items-center font-bold duration-200 hover:text-primary'>
					Productos
				</div>
			</Link>
			<Link href={'/casas-tostadoras'}>
				<div className='flex flex-col items-center font-bold duration-200 hover:text-primary'>
					Tostadores
				</div>
			</Link>
			<Link href={'/cafeterias'}>
				<div className='flex flex-col items-center font-bold duration-200 hover:text-primary'>
					Cafeterías
				</div>
			</Link>
		</nav>
	);
};

export default Menu;
