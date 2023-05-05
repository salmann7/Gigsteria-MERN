import React, { useCallback } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import qs from "query-string";

const CategoryBox = ({
    currentUser,
    icon: Icon,
    label,
    selected
}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  // const params = useParams();
  // console.log(params);
  // const category = params.category;
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if(queryParams){
      currentQuery = qs.parse(qs.stringify(queryParams))
    }

    const updatedQuery = {
      ...currentQuery,
      category: label
    }

    if(category === label){
      delete updatedQuery.category;
    }

    if(currentUser){
      const url = qs.stringifyUrl({
        url: '/',
        query: updatedQuery
      },{ skipNull: true});
      navigate(url);
    } else{
      const url = qs.stringifyUrl({
        url: '/dashboard',
        query: updatedQuery
      },{ skipNull: true});
      navigate(url);
    }
  },[label, queryParams, navigate])
  return (
    <div onClick={handleClick} className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer 
                                           ${selected ? 'border-b-neutral-800':'border-transparent'}
                                           ${selected ? 'text-neutral-800':'text-neutral-500'}`}>
        <Icon size={26} />
        <div className="font-medium text-sm">{label}</div>
    </div>
  )
}

export default CategoryBox
