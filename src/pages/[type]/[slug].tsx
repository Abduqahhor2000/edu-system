import { GetServerSideProps } from 'next';
import { withLayout } from '../../layout/layout';
import axios from 'axios';
import { MenuItem } from '../../interfaces/menu.interface';
import { PageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { IAppContext } from '@/context/app.context';
import { firstLevelMenu } from '@/helpers/constants';
import CoursePageComponent from '@/page-components/course-page-component/course-page-component';

const Index = ({ products, firstCategory, page }: PageProps) => {
	return <CoursePageComponent products={products} firstCategory={firstCategory} page={page} />;
};

export default withLayout(Index);

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ query }) => {
	const { slug, type } = query;

	if (!slug) {
		return { notFound: true };
	}

	const firstCategoryItem = firstLevelMenu.find(c => c.route === type);

	if (!firstCategoryItem) {
		return { notFound: true };
	}

	const { data: menu } = await axios.post<MenuItem[]>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/page-find`, {
		firstCategory: firstCategoryItem.id,
	});
	const { data: page } = await axios.get<PageModel>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/page-find/${slug}`);
	const { data: products } = await axios.post<ProductModel[]>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/product-find`, {
		category: slug,
	});

	return {
		props: { menu, page, products, firstCategory: firstCategoryItem.id },
	};
};

interface PageProps extends Record<string, unknown> {
	menu: MenuItem[];
	page: PageModel;
	products: ProductModel[];
	firstCategory: number;
}