import React from 'react'
import Button from '../buttons/Button'

interface SerachbarProps {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onSearch: () => void
}
const Serachbar: React.FC<SerachbarProps> = ({ value, onChange, onSearch }) => {
  return (
    <div className='flex gap-2'>
        <input type="text" value={value} onChange={onChange} placeholder='Serach for products...' className='border border-gray-300 rounded py-2 px-4 text-sm outline-0' />
        <Button label='Search' onClick={onSearch} />
    </div>
  )
}

export default Serachbar