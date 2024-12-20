import Head from "next/head";
import Header from "@components/header";
import styles from "@styles/home.module.css";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: React.FC = () => {
    const { t } = useTranslation("common");

    // Hardcoded user data
    const users = [
        { username: "admin", password: "admin123", role: "admin" },
        { username: "player1", password: "imperial123", role: "user" },
        { username: "player2", password: "chaos123", role: "user" },
    ];

    return (
        <>
            <Head>
                <title>{t('app.title')}</title>
                <meta name="description" content={t('meta.description')} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <Header />
            <main className="text-center md:p-24 p-6 min-h-screen">
                <span className="flex flex-row justify-center items-center">
                    <h1 className="pl-6 text-4xl text-gray-800">{t('home.title')}</h1>
                </span>

                <div className="pt-6">
                    <p>{t('home.description')}</p>
                </div>

                {/* User Table */}
                <div className="pt-10">
                    <h2 className="text-2xl font-bold">Users</h2>
                    <table className="table-auto border-collapse border border-gray-300 w-full mt-6">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Username</th>
                                <th className="border border-gray-300 px-4 py-2">Password</th>
                                <th className="border border-gray-300 px-4 py-2">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.password}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default Home;


