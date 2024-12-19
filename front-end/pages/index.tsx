import Head from "next/head";
import Image from "next/image";
import Header from "@components/header";
import styles from "@styles/home.module.css";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: React.FC = () => {
    const { t } = useTranslation("common");

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
            </main>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any; }) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        }
    }
}

export default Home;

