import React from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { categories } from '../modals/UploadGigModal'
import Container from '../container/Container'
import CategoryBox from '../categoryBox/CategoryBox';

const Categories = ({currentUser}) => {
    const {pathname} = useLocation();
    // const params = useParams();
    // const qCat = params && params?.category;
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    // const category = ''
    console.log(category)
    const isMainPage = (pathname === '/') || (pathname === '/dashboard');

    if(!isMainPage){
        return null;
    }

  return (
    <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
            {categories.map((item) => (
                <CategoryBox currentUser={currentUser} key={item.label} label={item.label} icon={item.icon} selected={category === item.label}/>
            ))}
        </div>
    </Container>
  )
}

export default Categories
