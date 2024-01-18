"use client";

import { useParams } from 'next/navigation';
import React from 'react'
import Home from '~/app/page'
import AddProduct from './add-product/page';
import DashboardLayout from '~/components/dashboardlayout/page';
import CreatorDashboard from '~/components/creatordashboard/page';

export default function Dashboard() {

    const { id } = useParams();

    return (
        <>
            <DashboardLayout>
                <CreatorDashboard />
                
            </DashboardLayout>
        </>
    )
}
