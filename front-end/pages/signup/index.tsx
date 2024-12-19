
import { Inter } from 'next/font/google'

import React, { useEffect, useState } from "react";
import Header from '@components/header';
import UserOverviewTable from '@components/users/UserOverviewTable';
import Signup from '@components/users/signup';
import { User } from '@types';
import UserService from '@services/UserService';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const UserPage: React.FC = () => {

    const [users, setUsers] = useState<Array<User>>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);



    useEffect(() => {

    }, []);

    return (
        <>
            <Header />
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <Signup />

            </main>
        </>
    )
}


export const getServerSideProps = async (context: { locale: any; }) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        }
    }
}
export default UserPage; 
