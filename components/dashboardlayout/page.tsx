import React from 'react'
import Sidebar from './Sidebar'

type LayoutProps = {
    children: React.ReactNode;
};

const DashboardLayout = ({ children }: LayoutProps) => {
    return (
        <main className='flex gap-3 w-full h-screen relative'>
            <div className='hidden lg:block col-span-1'>
                <Sidebar />
            </div>
            <div className='col-span-4 p-6'>
                {children}
            </div>

        </main>
    )
}

export default DashboardLayout