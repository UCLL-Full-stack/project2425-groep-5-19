import Head from "next/head";
import { useState, useEffect } from "react";
import Header from "@components/header";
import UserService from "@services/UserService";
import UserOverviewTable from "@components/users/UserOverviewTable";
import { User } from "@types";

const Users: React.FC = () => {
    const [users, setUsers] = useState<Array<User>>([]);
    const [error, setError] = useState<string | null>(null);

    const getUsers = async () => {
        try {
            setError(null);
            const userList = await UserService.getAllUsers();
            setUsers(userList);
        } catch (err: any) {
            setError(err.message || "Failed to fetch users");
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <Head>
                <title>Users</title>
            </Head>
            <Header />
            <main className="p-6 min-h-screen flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4">Users</h1>
                <section>
                    {/* Error Handling */}
                    {error && <div className="text-red-800">{error}</div>}

                    {/* User Overview Table */}
                    {users.length > 0 && (
                        <UserOverviewTable users={users} />
                    )}

                    {users.length === 0 && !error && (
                        <div className="text-gray-600">No users available.</div>
                    )}
                </section>
            </main>
        </>
    );
};

export default Users;

