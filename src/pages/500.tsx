import { LayoutType } from 'types/app';

const Page500 = () => {
	return (
		<div className='flex h-[90vh] flex-col items-center justify-center gap-10 bg-gray-900 p-10'>
			<div className='text-center'>
				<h1 className='mb-2  text-center text-7xl font-bold text-gray-100'>
					400
				</h1>
				<p className='mb-4 text-2xl font-medium'>Page not found</p>
			</div>
			<a
				href='/'
				className='border-PrimmaryColor text-PrimmaryColor block h-fit w-auto rounded-[50px] border px-[31px] py-[13px] transition delay-150 duration-150 ease-in-out hover:scale-110 hover:cursor-pointer'
			>
				Go to home page
			</a>
		</div>
	);
};

Page500.layout = LayoutType.PUBLIC;
export default Page500;
