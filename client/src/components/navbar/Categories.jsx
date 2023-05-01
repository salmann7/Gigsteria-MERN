import React from 'react'
import { useLocation, useSearchParams } from 'react-router-dom';
import { categories } from '../modals/UploadGigModal'
import Container from '../container/Container'
import CategoryBox from '../categoryBox/CategoryBox';

const Categories = () => {
    const {pathname} = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams?.get('cat');
    const isMainPage = (pathname === '/') || (pathname === '/dashboard');

    if(!isMainPage){
        return null;
    }

  return (
    <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
            {categories.map((item) => (
                <CategoryBox key={item.label} label={item.label} icon={item.icon} selected={category === item.label}/>
            ))}
        </div>
    </Container>
  )
}

export default Categories
