import { PageCategory } from '../interfaces/page.interface';
import { IFirstLevelMenu } from '../interfaces/menu.interface';
import CoursesIcon from './icons/course.svg';
import BooksIcon from './icons/book.svg';

export const firstLevelMenu: IFirstLevelMenu[] = [
	{ route: 'courses', name: 'Courses', icon: <CoursesIcon />, id: PageCategory.Courses },
	{ route: 'books', name: 'Books', icon: <BooksIcon />, id: PageCategory.Books },
];