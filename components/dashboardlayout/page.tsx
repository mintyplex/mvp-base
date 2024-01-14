import React from 'react'
import Sidebar from './Sidebar'

type LayoutProps = {
    children: React.ReactNode;
};

const DashboardLayout = ({ children }: LayoutProps) => {
    return (
        <main className='flex gap-0 w-full h-screen relative'>
            <div className='hidden lg:block'>
                <Sidebar />
            </div>
            <div className='p-6'>
                {children}
            </div>

        </main>
    )
}

export default DashboardLayout