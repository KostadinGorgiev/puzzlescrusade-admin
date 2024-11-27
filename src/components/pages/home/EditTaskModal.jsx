import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import { Fragment, useEffect } from "react";
import * as Yup from "yup";
import axiosInterface from "../../../utils/axiosInterface";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  link: Yup.string().url("Valid url is required").required("Link is required"),
  type: Yup.string().required("Type is required"),
  bonus_amount: Yup.string().required("Bonus_amount is required"),
  password: Yup.string(),
  question: Yup.string(),
});

const EditTaskModal = ({ visible, onClose, task }) => {
  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      title: "",
      link: "",
      type: "telegram",
      bonus_amount: "",
      password: "",
      question: "",
    },
    onSubmit: async (data) => {
      console.log(data);
      let response = await axiosInterface.post("admin/task/update-task", {
        id: task.id,
        ...data,
      });
      console.log(response);

      onClose(true);
    },
  });

  useEffect(() => {
    if (!visible) {
      formik.resetForm({
        title: "",
        link: "",
        type: "telegram",
        bonus_amount: "",
        password: "",
        question: "",
      });
    } else {
      if (task) {
        formik.setValues({
          title: task.title,
          link: task.link,
          type: task.type,
          bonus_amount: task.bonus_amount,
          password: task.password,
          question: task.question,
        });
      }
    }
  }, [visible, task]);

  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => onClose()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add Task
                </Dialog.Title>
                <div className="mt-2">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="space-y-12">
                      <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-6">
                          <div className="">
                            <label
                              htmlFor="title"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Title
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                  type="text"
                                  name="title"
                                  id="title"
                                  autoComplete="title"
                                  className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6 outline-none px-2"
                                  placeholder="Enter title here"
                                  {...formik.getFieldProps("title")}
                                />
                              </div>
                            </div>
                            {formik.errors.title && formik.touched.title && (
                              <p className="text-red-500">
                                {formik.errors.title}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="mt-6">
                          <div className="">
                            <label
                              htmlFor="link"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Link
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                  type="text"
                                  name="link"
                                  id="link"
                                  autoComplete="link"
                                  className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6 outline-none px-2"
                                  placeholder="Enter link here"
                                  {...formik.getFieldProps("link")}
                                />
                              </div>
                              {formik.errors.link && formik.touched.link && (
                                <p className="text-red-500">
                                  {formik.errors.link}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-6">
                          <div className="">
                            <label
                              htmlFor="type"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Type
                            </label>
                            <div className="mt-2">
                              <select
                                id="type"
                                name="type"
                                autoComplete="type"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 h-9"
                                {...formik.getFieldProps("type")}
                              >
                                <option value="telegram">Telegram</option>
                                <option value="twitter">Twitter</option>
                                <option value="youtube">Youtube</option>
                              </select>
                            </div>
                            {formik.errors.type && formik.touched.type && (
                              <p className="text-red-500">
                                {formik.errors.type}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="mt-6">
                          <div className="">
                            <label
                              htmlFor="bonus_amount"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Bonus_Amount
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                  type="number"
                                  name="bonus_amount"
                                  id="bonus_amount"
                                  autoComplete="bonus_amount"
                                  className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6 outline-none px-2"
                                  placeholder="Enter bonus_amount here"
                                  {...formik.getFieldProps("bonus_amount")}
                                />
                              </div>
                              {formik.errors.bonus_amount &&
                                formik.touched.bonus_amount && (
                                  <p className="text-red-500">
                                    {formik.errors.bonus_amount}
                                  </p>
                                )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-6">
                          <div className="">
                            <label
                              htmlFor="password"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Password(optional)
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                  type="text"
                                  name="password"
                                  id="password"
                                  autoComplete="password"
                                  className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6 outline-none px-2"
                                  placeholder="Enter password here"
                                  {...formik.getFieldProps("password")}
                                />
                              </div>
                              {formik.errors.password &&
                                formik.touched.password && (
                                  <p className="text-red-500">
                                    {formik.errors.password}
                                  </p>
                                )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-6">
                          <div className="">
                            <label
                              htmlFor="question"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Question(optional)
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                  type="text"
                                  name="question"
                                  id="question"
                                  autoComplete="question"
                                  className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6 outline-none px-2"
                                  placeholder="Enter question here"
                                  {...formik.getFieldProps("question")}
                                />
                              </div>
                              {formik.errors.question &&
                                formik.touched.question && (
                                  <p className="text-red-500">
                                    {formik.errors.question}
                                  </p>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="button"
                        className="text-sm/6 font-semibold text-gray-900"
                        onClick={() => onClose()}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditTaskModal;
