import Head from "next/head";
import { useState, useEffect } from "react";
import Header from "@components/header";
import ComplaintService from "@services/ComplaintService";
import ComplaintOverviewTable from "@components/complaints/ComplaintOverviewTable";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Complaint } from "@types";
import { t } from "i18next";

const Complaints: React.FC = () => {
    const [complaints, setComplaints] = useState<Array<Complaint>>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

    const getComplaints = async () => {
        setError(null);
        const response = await ComplaintService.getAllComplaints();

        if (!response.ok) {
            setError(response.statusText);
        } else {
            const complaints = await response.json();
            setComplaints(complaints);
        }
    };

    const handleRemoveComplaint = (userId: number) => {
        setComplaints((prev) => prev.filter((complaint) => complaint.userId !== userId));
    };

    useEffect(() => {
        getComplaints();
    }, []);

    return (
        <>
            <Head>
                <title>{t("complaints.title")}</title>
            </Head>
            <Header />
            <main className="p-6 min-h-screen flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4">Klachten</h1>
                <section>
                    {error && <div className="text-red-800">{error}</div>}

                    {complaints.length > 0 && (
                        <ComplaintOverviewTable
                            complaints={complaints}
                            selectComplaint={setSelectedComplaint}
                            removeComplaint={handleRemoveComplaint}
                        />
                    )}

                    {complaints.length === 0 && !error && (
                        <div className="text-gray-600">Geen klachten beschikbaar.</div>
                    )}
                </section>
            </main>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any; }) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "nl", ["common"])),
        }
    }
}

export default Complaints;




