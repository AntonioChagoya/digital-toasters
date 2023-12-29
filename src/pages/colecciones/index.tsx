// Types
import { LayoutType } from 'types/app';

const CollectionsPage = () => {
	return (
		<>
			<div className='container mx-auto flex h-screen gap-10 py-16'>
				<aside className='flex flex-col'>
					<h1 className='text-xl'>Colecciones</h1>
				</aside>
				<section>
					<div className='grid grid-cols-3 gap-10'>
						<div className='flex flex-col gap-5'></div>
					</div>
				</section>
			</div>
		</>
	);
};
CollectionsPage.layout = LayoutType.PUBLIC;
export default CollectionsPage;
