import { useEffect, useMemo, useState } from "react";
import Layout from "../layout/layout";
import axiosInterface from "../utils/axiosInterface";
import LevelConfig from "../config/config.json";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { userLevel } from "../utils/service";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [counts, setCounts] = useState([]);
  const [filterLevel, setFilterLevel] = useState([]);
  const [page, setPage] = useState(1);

  const fetchUsersReport = async () => {
    let params = new URLSearchParams();
    params.append("page", page);
    params.append("level_point", filterLevel);
    let response = await axiosInterface.get(
      `admin/user/list?${params.toString()}`
    );
    setUsers(response.data.users);
    setCounts(response.data.counts);
  };

  useEffect(() => {
    fetchUsersReport();
  }, [filterLevel, page]);

  const reportData = useMemo(() => {
    return counts.map((count) => {
      return {
        name: LevelConfig.level[count.level].title,
        count: count.count,
      };
    });
  }, [counts]);

  return (
    <Layout>
      <div className="p-10 mx-auto overflow-auto flex items-center justify-center relative">
        <div className="w-full flex flex-col justify-center">
          <div className="text-xl">Total Users</div>
          <LineChart
            width={1500}
            height={300}
            data={reportData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            title="User levels"
          >
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-start mb-10 gap-2">
              <div className="w-44">
                <label
                  htmlFor="level"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Level
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                  >
                    <option value="" selected>
                      All
                    </option>
                    {LevelConfig.level.map((level, index) => (
                      <option key={index} value={level.from}>
                        {level.title} ({index + 1})
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        User Name
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        First Name
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Last Name
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Telegram UserId
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Level
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Coin Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {users.map((user, index) => (
                      <tr
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        key={index}
                      >
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {user.username}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          {user.first_name}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {user.last_name}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {user.t_user_id}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {userLevel(user.level_point).title} (
                          {userLevel(user.level_point).index + 1})
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {user.coin_balance}
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
    </Layout>
  );
};

export default Users;
