"use client";
import {useState, useEffect} from "react";
import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from "@headlessui/react";
import {TrashIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {ToastContainer} from "react-toastify";

//for showing date
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import {showToastError, showToastSuccess} from "@/utils/ShowToast";

function blogManagement() {
  const [allPosts, setAllPosts] = useState([]);
  const [postID, setPostID] = useState("");

  const [showModal, setShowModal] = useState(false);

  const getAllPostData = async () => {
    await fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setAllPosts(data));
  };

  useEffect(() => {
    getAllPostData();
  }, []);

  const deletePostHandler = async () => {
    const res = await fetch(`/api/posts?id=${postID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 201) {
      showToastSuccess("مقاله مورد نظر با موفقيت حذف گرديد");
      getAllPostData();
    } else if (res.status === 422) {
      showToastError("اطلاعات صحيح نيست، مجددا تلاش نمایید");
    } else if (res.status === 500) {
      showToastError("یک خطا از سمت سرور وجود دارد، لطفا لحظاتی دیگر تلاش نمایید");
    }
  };

  return (
    <div className="container mx-auto mt-20">
      <ToastContainer limit={1} />
      <div className="overflow-x-auto border sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <caption>
            <div className="flex justify-between items-center p-5 bg-white mb-5">
              <div className="text-2xl font-bold text-left rtl:text-right text-transparent bg-clip-text bg-gradient-to-r to-pink-600 from-sky-600">
                مدیریت مقالات
                <p className="mt-1 text-sm font-normal text-gray-500">در جدول زیر مقالات را مشاهده می‌کنید و می‌توانید آن‌ها را مدیریت نمایید.</p>
              </div>
              <Link
                href="/blog/add-post"
                className="text-white bg-gradient-to-br h-9 from-green-400 to-green-600 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-green-200 rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
              >
                افزودن مقاله جدید
              </Link>
            </div>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                عنوان
              </th>
              <th scope="col" className="px-6 py-3">
                تاریخ ایجاد
              </th>
              <th scope="col" className="px-6 py-3">
                وضعیت انتشار
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">مدیریت</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {allPosts.length === 0 ? (
              <>
                <tr role="status" className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse">
                  <td className="px-6 py-4">
                    <div className="h-2.5 bg-gray-300 rounded-full w-20"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-2.5 bg-gray-300 rounded-full w-20"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-2.5 bg-gray-300 rounded-full w-20"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-2.5 bg-gray-300 rounded-full w-20"></div>
                  </td>
                </tr>
              </>
            ) : (
              allPosts.map((item) => {
                return (
                  <tr key={item._id} className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {item.title}
                    </th>
                    <td className="px-6 py-4">{dayjs.extend(jalaliday)(item.createdAt, {jalali: true}).calendar("jalali").locale("fa").format("DD MMMM YYYY")}</td>
                    <td className="px-6 py-4">
                      {item.publish === true ? (
                        <div className="flex items-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> منتشر شده
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> منتشر نشده
                        </div>
                      )}
                    </td>
                    <td className="flex gap-6 px-6 py-4 text-right">
                      <Link href={`/blog/edit-post/${item._id}`} className="text-blue-500 hover:text-blue-400">
                        <PencilSquareIcon className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setPostID(item._id);
                        }}
                        className="text-red-500 hover:text-red-400"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* modal dialog for delete post */}
        <Transition show={showModal}>
          <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
            <TransitionChild enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-3xl">
                  <DialogTitle className="p-4 md:p-5 text-center">
                    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <div className="mb-5 text-lg font-normal text-gray-500">آيا از حذف مقاله اطمينان داريد ؟</div>
                  </DialogTitle>
                  <div className="flex gap-4">
                    <button
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                      onClick={() => {
                        deletePostHandler();
                        setShowModal(false);
                      }}
                    >
                      بله، مطمئنم
                    </button>
                    <button
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                      onClick={() => setShowModal(false)}
                    >
                      خير، بستن
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}

export default blogManagement;
