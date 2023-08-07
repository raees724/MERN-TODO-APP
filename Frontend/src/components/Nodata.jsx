import React from 'react'

const Nodata = () => {
    return (
        <>
            <div className=" w-full px-10 md:px-0 h-screen flex items-center justify-center">
                <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
                    <img src='https://cdn.dribbble.com/users/3008811/screenshots/7090670/media/5a61f4778d6a527572a773c1f69001b8.gif' className='h-20'></img>
                    
                    <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">Sorry, No data found.</p>
                </div>
            </div></>
    )
}

export default Nodata