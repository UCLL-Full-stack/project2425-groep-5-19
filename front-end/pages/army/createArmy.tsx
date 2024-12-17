import Head from "next/head";
import Header from "@components/header";
import CreateArmyForm from "@components/armies/CreateArmyForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const CreateArmy: React.FC = () => {
    return (
        <>
            <Head>
                <title>Create Army</title>
            </Head>
            <Header />
            <main className="p-6 min-h-screen flex flex-col items-center">
                <CreateArmyForm />
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

export default CreateArmy;

