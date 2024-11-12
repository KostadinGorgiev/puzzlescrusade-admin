import { useEffect, useState } from "react";
import AddTaskModal from "../components/pages/home/AddTaskModal";
import Layout from "../layout/layout";
import axiosInterface from "../utils/axiosInterface";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    let response = await axiosInterface.get("admin/task/list");
    if (response.data.success) {
      setTasks(response.data.tasks);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Layout>
      <div className="max-w-5xl px-10 mx-auto min-h-[calc(100vh-64px)] overflow-auto flex items-center justify-center">
        <div className="w-full flex flex-col justify-center">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-end mb-10">
              <button
                type="button"
                onClick={() => setVisible(true)}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
              >
                Add Task
              </button>
            </div>
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-all"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="checkbox-all" className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Link
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Bonus
                      </th>
                      <th scope="col" className="p-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {tasks.map((task, index) => (
                      <tr
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        key={index}
                      >
                        <td className="p-4 w-4">
                          <div className="flex items-center">
                            <input
                              id="checkbox-table-1"
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="checkbox-table-1"
                              className="sr-only"
                            >
                              checkbox
                            </label>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {task.title}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          {task.link}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {task.type}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {task.bonus_amount}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            className="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddTaskModal
        visible={visible}
        onClose={(e) => {
          if (e) {
            fetchTasks();
          }
          setVisible(false);
        }}
      />
    </Layout>
  );
};

export default Home;
