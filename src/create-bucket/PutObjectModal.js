import React from "react";
import { createModal } from 'react-modal-promise'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm } from "react-hook-form";
import classNames from "classnames"

const PutObject = ({ isOpen, onResolve, text, title }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "all",});
    const onSubmit = data => {
        onResolve(data)
    }

    const cancel = () => onResolve(null);

    return (
        <Modal open={isOpen} onClose={cancel} center>

            <div className="p-10">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="objectName">
                            Object Name
                        </label>
                        <input
                            {...register("objectName", { required: false })}
                            className={classNames({
                                "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline":true,
                                "border-red-500":errors.objectName
                            })}
                            id="objectName"
                            type="text"
                            placeholder=""/>
                        {errors.objectName && <p className="text-red-500 text-xs italic">Please enter a valid object name.</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="objectFile">
                            Object File
                        </label>
                        <input
                            {...register("objectFile", { required: true })}
                            className={classNames({
                                "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline":true,
                                "border-red-500":errors.objectFile
                            })}
                            id="objectFile"
                            type="file"
                            placeholder=""/>
                            {errors.objectFile && <p className="text-red-500 text-xs italic">Please select a file.</p>}
                    </div>


                    <div className="flex items-end justify-end">
                    <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
                    <button onClick={cancel} type="button" className="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
                    </div>
                </form>
            </div>

        </Modal>
    );
};

const PutObjectModal = createModal(PutObject);

export default PutObjectModal
