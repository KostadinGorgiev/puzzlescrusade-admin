import { useEffect, useState } from "react";
import AddTaskModal from "../components/pages/home/AddTaskModal";
import Layout from "../layout/layout";
import axiosInterface from "../utils/axiosInterface";
import EditTaskModal from "../components/pages/home/EditTaskModal";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editVisible, setEditVisible] = useState(null);
  const [checkedTasks, setCheckedTasks] = useState({});

  const fetchTasks = async () => {
    let response = await axiosInterface.get("admin/task/list");
    if (response.data.success) {
      setTasks(response.data.tasks);
    }
  };

  const fetchUserTasks = async () => {
    let response = await axiosInterface.get("admin/task/users-task");
    if (response.data.success) {
      setUserTasks(response.data.userTasks);
    }
  };

  const handleDeleteTasks = async () => {
    if (window.confirm("Are you sure want to delete?")) {
      let response = await axiosInterface.post("admin/task/delete-task", {
        ids: Object.keys(checkedTasks),
      });
      setCheckedTasks({});
      fetchTasks();
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    fetchUserTasks();
  }, []);

  return (
    <Layout>
      <div className="max-w-5xl px-10 mx-auto min-h-[calc(100vh-64px)] overflow-auto flex items-center justify-center">
        <div className="w-full flex flex-col justify-center">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-end mb-10 gap-2">
              <button
                type="button"
                onClick={() => handleDeleteTasks()}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                hidden={Object.keys(checkedTasks).length === 0}
              >
                Delete Tasks
              </button>
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
                            checked={
                              Object.keys(checkedTasks).length ==
                                tasks.length && tasks.length != 0
                            }
                            onChange={() => {
                              if (
                                Object.keys(checkedTasks).length == tasks.length
                              ) {
                                setCheckedTasks({});
                              } else {
                                let tmp = {};
                                tasks.forEach((task) => {
                                  tmp[task.id] = true;
                                });
                                setCheckedTasks(tmp);
                              }
                            }}
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
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        User Count
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
                              checked={checkedTasks[task.id]}
                              onChange={() => {
                                let tmp = { ...checkedTasks };
                                if (checkedTasks[task.id]) {
                                  delete tmp[task.id];
                                } else {
                                  tmp[task.id] = true;
                                }
                                setCheckedTasks(tmp);
                              }}
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
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {userTasks.filter(
                            (uTask) => uTask.task_id == task.id
                          ).length}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            className="text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => {
                              setSelectedTask(task);
                              setEditVisible(true);
                            }}
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
        onClose={(callApi) => {
          if (callApi) {
            fetchTasks();
          }
          setVisible(false);
        }}
      />
      <EditTaskModal
        visible={editVisible}
        task={selectedTask}
        onClose={(callApi) => {
          if (callApi) {
            fetchTasks();
          }
          setEditVisible(false);
        }}
      />
    </Layout>
  );
};

export default Home;
