import Head from "next/head";
import Header from "@components/header";
import CreateArmyForm from "@components/armies/CreateArmyForm";

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

export default CreateArmy;

