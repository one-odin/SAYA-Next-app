"use client";
import React, {useState, useEffect} from "react";
import {Formik} from "formik";
import {addPostValidationSchema} from "@/utils/validationSchema";
import {useRouter} from "next/navigation";
import {showToastError, showToastSuccess} from "@/utils/ShowToast";

import dynamic from "next/dynamic";
import {ToastContainer} from "react-toastify";
const TextEditor = dynamic(
  () => {
    return import("@/components/modules/TextEditor/TextEditor");
  },
  {ssr: false}
);

export default function AddNewPost() {
  const [showErrMsgTextBody, setShowErrMsgTextBody] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  const navigate = useRouter();
  const initialValues = {title: "", description: "", body: ""};

  const addPostHandler = async (values) => {
    setIsFormSubmit(true);

    const newPostData = {
      title: values.title,
      description: values.description,
      body: values.body,
    };

    console.log(newPostData);

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newPostData),
    });
    if (res.status === 201) {
      setIsFormSubmit(false);
      showToastSuccess("مقاله جدید با موفقیت افزوده شد");
      setTimeout(() => {
        navigate.push("/blog");
      }, 3000);
    } else if (res.status === 422) {
      setIsFormSubmit(false);
      showToastError("اطلاعات وارد شده صحیح نیست، مجددا تلاش نمایید");
    } else if (res.status === 500) {
      setIsFormSubmit(false);
      showToastError("یک خطا از سمت سرور وجود دارد، لطفا لحظاتی دیگر تلاش نمایید.");
    }
  };

  return (
    <div className="container mx-auto text-center mt-20 pb-5">
      <ToastContainer limit={1} />
      <div className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-sky-400">
        افزودن مقاله جدید
        <p className="mt-1 text-sm font-normal text-gray-500">موارد خواسته شده در فرم زیر را تکمیل نمایید.</p>
      </div>
      <div className="text-right">
        <Formik
          validationSchema={addPostValidationSchema}
          initialValues={initialValues}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={(values) => {
            setIsFormSubmit(true);
            addPostHandler(values);
            if (values.body.length === 0) {
              setShowErrMsgTextBody(true);
            }
          }}
        >
          {(props) => {
            return (
              <form onSubmit={props.handleSubmit} className="block mx-auto mt-8 lg:w-1/2 w-full">
                <div className="mb-5">
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-600">
                    عنوان مقاله
                  </label>
                  <input
                    className={`border ${
                      props.touched.title && Boolean(props.errors.title) && "border-red-500"
                    } border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-gray-50 focus:border-gray-50 block w-full p-2.5`}
                    type="text"
                    id="title"
                    {...props.getFieldProps("title")}
                  />
                  {props.touched.title && props.errors.title && <div className="invalid-feedback mt-1 text-sm font-light text-red-500">{props.errors.title}</div>}
                </div>
                <div className="mb-5">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-600">
                    توضيح كوتاه مقاله
                  </label>
                  <textarea
                    id="description"
                    rows="3"
                    className={`border ${
                      props.touched.description && Boolean(props.errors.description) && "border-red-500"
                    } border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-gray-50 focus:border-gray-50 block w-full p-2.5`}
                    {...props.getFieldProps("description")}
                  />

                  {props.touched.description && props.errors.description && <div className="invalid-feedback mt-1 text-sm font-light text-red-500">{props.errors.description}</div>}
                </div>
                <div className="mb-5">
                  <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-600">
                    متن مقاله
                  </label>
                  <TextEditor
                    initialData=""
                    bodyContent={(data) => {
                      if (data.length !== 0) {
                        setShowErrMsgTextBody(false);
                      }
                      return props.setFieldValue("body", data);
                    }}
                    onBlur={(data) => {
                      if (data.length === 0) {
                        setShowErrMsgTextBody(true);
                      }
                    }}
                    className="border-2 border-gray-500 h-60"
                  />
                  {showErrMsgTextBody && <div className="invalid-feedback block mt-1 text-sm font-light text-red-500">وارد کردن متن مقاله الزامیست</div>}
                </div>
                <div className="text-center mt-4">
                  {isFormSubmit ? (
                    <button
                      disabled
                      type="button"
                      className="text-white bg-gradient-to-br from-green-400 to-green-600 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center"
                    >
                      <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      تاييد ...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      id="submit-button"
                      className="text-white bg-gradient-to-br from-green-400 to-green-600 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-green-200 rounded-lg text-sm px-10 py-2"
                    >
                      تایید
                    </button>
                  )}
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
