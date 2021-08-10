import React, {useEffect, useState} from "react"
import {useParams, Link} from "react-router-dom"
import prettyBytes from "pretty-bytes"
import mc from "./mc";
import createPutObjectModal from "./create-bucket/PutObjectModal"
import {getFileIcon} from "./utils"
import format from 'date-fns/format'


const ListObjects = () => {

    const {bucketName} = useParams()
    const [objects, setObjects] = useState([]);

    const clearObjects = () => {
        setObjects([])
    }
    const deleteObject = async (obj) => {
        clearObjects()
        await mc.removeObject(bucketName, obj.name)
        await listObjectsOfBucket()
    }

    const deleteObjects = async () => {
        clearObjects()
        const delObjIds = objects.map((o) => o.name)
        if (delObjIds) {
            await mc.removeObjects(bucketName, delObjIds)
        }
        await listObjectsOfBucket()
    }

    const listObjectsOfBucket = async () => {
        try {
            const objectsStream = mc.extensions.listObjectsV2WithMetadata(bucketName, '', true, '')
            objectsStream.on('data', async (chunk) => {
                const {name: objectName} = chunk
                const presignedUrl = await mc.presignedGetObject(bucketName, objectName, 24 * 60 * 60)
                setObjects((prev) => {
                    return [...prev, {...chunk, presignedUrl: presignedUrl}]
                })
            });
            objectsStream.on('error', (err) => {
                console.log("::Chunk Error::", err)
            });
            objectsStream.on('end', () => {
                console.log("::Chunk End::")
            });

        } catch (err) {
            console.log("Error in list objects", err)
        }
    };

    useEffect(() => {
        clearObjects()
        listObjectsOfBucket();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bucketName]);


    const openPutObject = async () => {
        const formValues = await createPutObjectModal({});
        if (formValues) {
            const {
                objectName,
                objectFile,
            } = formValues

            const fileToUpload = objectFile[0]

            const objectKey = objectName || fileToUpload.name
            const contentType = fileToUpload.type

            const fileReader = new FileReader()
            fileReader.onload = async function (evt) {
                if (evt.target.readyState === FileReader.DONE) {
                    // Get the unsigned 8 bit int8Array (ie Uint8Array) of the 600 bytes (this looks like '[119,80,78,71...]'):
                    const uint = new Uint8Array(evt.target.result)
                    await mc.putObject(bucketName, objectKey, Buffer.from(uint), {
                        'Content-Type': contentType,
                        'X-Amz-Meta-App': "ReactJS"
                    })
                    clearObjects()
                    await listObjectsOfBucket();
                }
            }
            fileReader.onerror = function () {
                fileReader.abort()
                // reject(null)
            }
            fileReader.readAsArrayBuffer(fileToUpload)

        }

    }


    return (
        <div className="container">


            <div>
                <div>
                    <span className="mr-3 hover:underline text-gray-400"><Link to="/" >Buckets</Link></span> > <span className="ml-2 text-gray-500 hover:underline">{bucketName}</span>
                </div>
            </div>

            <h2 className="mt-5 mb-2">List of Objects </h2>

            <div className="m-5 flex items-end justify-end">
                <button type="button" onClick={deleteObjects}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> Delete
                    All
                </button>
                <button onClick={openPutObject} type="button"
                        className="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Upload
                    File
                </button>
            </div>


            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        S.No.
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Object name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Type
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Last Modified
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Delete</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {objects.map((obj, index) => (
                                    <tr key={obj.name}>
                                        <td className="px-2 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div
                                                    className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                                                    <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                                                </div>

                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                <div className="flex ">
                                                    <div className="mr-2">
                                                        {getFileIcon(obj)}
                                                    </div>
                                                    <div>
                                                        <div
                                                            className="text-sm font-medium text-gray-900">{obj.name}</div>
                                                        <div
                                                            className="text-sm text-gray-500">{prettyBytes(obj.size)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <span
                                              className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {obj.metadata['content-type']}
                                          </span>
                                        </td>
                                        <td className="text-gray-500">{format(obj.lastModified, "dd MMM yyyy hh:mm a")}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a target="_blank"  rel="noopener noreferrer" href={obj.presignedUrl} className="text-indigo-600 hover:text-indigo-900">Download</a>

                                            <button rel="noopener noreferrer" className="ml-5 text-indigo-600 hover:text-indigo-900"
                                               onClick={() => {
                                                   deleteObject(obj)
                                               }}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </div>)
}

export default ListObjects