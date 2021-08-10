import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import mc from "./mc";
import ModalFactory from "react-modal-promise";
import createBucketModal from "./create-bucket/CreateBucketModal";


const ListBuckets = () => {

    const [buckets, setBuckets] = useState([]);

    const getBuckets = async () => {
        const res = await mc.listBuckets();
        setBuckets(res);
    };

    useEffect(() => {
        getBuckets();
    }, []);

    const openCreateBucket = async () => {
        const formValues = await createBucketModal({});
        if (formValues) {
            const {
                bucketName
            } = formValues
            try {
                const bucketRes = await mc.makeBucket(bucketName)
                console.log("Successfully created bucket:", bucketRes)
                getBuckets();
            } catch (er) {
                console.log("Error creating bucket:", er)
            }
        }
    }

    return (
        <div className="container mx-auto mt-5 ">

            <ModalFactory scope="componentScope"/>
            <div className="flex items-start justify-between mb-2">
                <div>
                <h2>List of Buckets </h2>
                </div>

                <button onClick={openCreateBucket} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                    Create Bucket
                </button>
            </div>

                <div className="flex flex-col border border-gray-100  p-5">
                <table className="table-fixed">
                    <thead>
                    <tr className="text-purple-700">
                        <th className="text-left w-16">S.No</th>
                        <th className="text-left ">Bucket Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {buckets.map((bucket, index) => {
                        return (<tr key={bucket.name}  className=" border border-gray-100">
                                <td className="p-2">{index + 1}</td>
                                <td>
                                    <Link to={`/list-objects/${bucket.name}`} className={"text-green-500 hover:underline"}>{bucket.name}</Link>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>)
}

export default ListBuckets