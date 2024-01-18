import React from 'react'
import Sidebar from './Sidebar'

type LayoutProps = {
    children: React.ReactNode;
};

const DashboardLayout = ({ children }: LayoutProps) => {
    return (
        <main className='flex gap-4 w-full h-screen relative'>
            <div className='hidden lg:block'>
                <Sidebar />
            </div>
            <div className=' pr-4 h-screen px-4 md:px-0  overflow-y-scroll rounded-xl w-full scrollbar-hide'>
                {children}
            </div>

        </main>
    )
}

export default DashboardLayout