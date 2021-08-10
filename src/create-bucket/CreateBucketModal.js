import React from "react";
import { createModal } from 'react-modal-promise'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm } from "react-hook-form";
import classNames from "classnames"

const CreateBucket = ({ isOpen, onResolve, text, title }) => {
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bucketName">
                            Bucket Name
                        </label>
                        <input
                            {...register("bucketName", { required: true })}
                            className={classNames({
                                "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline":true,
                                "border-red-500":errors.bucketName
                            })}
                            id="bucketName"
                            type="text"
                            placeholder=""/>
                            {errors.bucketName && <p className="text-red-500 text-xs italic">Please enter a bucket name.</p>}
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

const CreateBucketModal = createModal(CreateBucket);

export default CreateBucketModal
