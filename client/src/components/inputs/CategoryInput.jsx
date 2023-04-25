import React from 'react'

const CategoryInput = ({
    icon: Icon,
    label,
    selected,
    onClick
}) => {
  return (
    <div onClick={() => onClick(label)} 
         className={`rounded-xl border-2 p-4 flex fle-col gap-3 hover:border-black cursor-pointer
                    ${selected ? 'border-black':'border-neutral-200'}`}>
      <Icon size={30} />
      <div className="font-semibold">
        {label}
      </div>
    </div>
  )
}

export default CategoryInput
