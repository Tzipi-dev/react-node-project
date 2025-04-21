import { useParams } from "react-router";
import { useGetFoundByIdQuery } from "../redux/api/founds/apiFoundSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
const FoundDetails = () => {
    const { id } = useParams();
    // console.log("id:", id);
    const { data: found, isLoading, isError } = useGetFoundByIdQuery(id ? id : skipToken);
    // console.log("found:", found);
    useEffect(() => {

    }, [id]);
    return (
        <div>
            {
                isLoading ? <div>Loading...</div> : isError ? <div>error...</div> : found ? (
                    <div>
                        <h2>Found Details</h2>
                        <p>ID: {found.name}</p>
                        {/* Display other found properties here */}
                    </div>
                ) : (
                    <div>Found not found.</div>
                )
            }

        </div>
    );
};

export default FoundDetails;