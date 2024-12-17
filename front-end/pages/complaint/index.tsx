import Head from "next/head";
import { useState, useEffect } from "react";
import Header from "@components/header";
import ComplaintService from "@services/ComplaintService";
import ComplaintOverviewTable from "@components/complaints/ComplaintOverviewTable";

import { Complaint } from "@types";

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

    useEffect(() => {
        getComplaints();
    }, []);

    return (
        <>
            <Head>
                <title>Complaints</title>
            </Head>
            <Header />
            <main className="p-6 min-h-screen flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4">Complaints</h1>
                <section>
                    {/* Error Handling */}
                    {error && <div className="text-red-800">{error}</div>}

                    {/* Complaint Overview Table */}
                    {complaints.length > 0 && (
                        <ComplaintOverviewTable
                            complaints={complaints}
                            selectComplaint={setSelectedComplaint}
                        />
                    )}

                    {complaints.length === 0 && !error && (
                        <div className="text-gray-600">No complaints available.</div>
                    )}
                </section>


            </main>
        </>
    );
};

export default Complaints;


