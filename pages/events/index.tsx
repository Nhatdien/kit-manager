import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllEvents } from "../../repositories/Event.repository";

export default function Events() {
  interface EvData {
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    users: [];
  }

  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [evData, setEvData] = useState<Array<EvData>>([]);

  // Function
  const getData = async () => {
    try {
      setLoading(true);
      const events = await getAllEvents({ page: currentPage });
      console.log(events);
      setEvData(events.data);
      setMaxPage(events.last_page);
    } catch (err: any) {
      setErr(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderTable = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[3rem]">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      );
    }

    if (err && err.length > 0) {
      return <div>{err}</div>;
    }

    if (evData.length > 0) {
      return (
        <>
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th></th>
                <th>Tên event</th>
                <th>Số lượng</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {evData.map((data, key) => {
                return (
                  <tr className="relative align-top" key={key}>
                    <td>{key + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.description}</td>
                    <td>{data.start_date}</td>
                    <td>{data.end_date}</td>
                    <td className="relative z-50">
                      <Link href={`/events/${data.id}/update`}>
                        <button className="btn btn-success mr-4">Update</button>
                      </Link>
                      <label htmlFor="input_del-ev" className="btn btn-error">
                        Delete
                      </label>
                    </td>

                    <td className="absolute inset-0 bg-transparent">
                      <Link
                        className="absolute inset-0"
                        href={`/events/${data.id}`}
                      ></Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      );
    }

    if (evData.length === 0) {
      return <div>Không có data</div>;
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1 > maxPage ? 1 : currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
  };

  // Hooks
  useEffect(() => {
    getData();
  }, [currentPage]);
  // fake data API
  const fakeData = [
    {
      id: 1,
      name: "Chào tân",
      amount: 2,
      startDay: "06/07/2002",
      endDay: "06/07/2002",
    },
    {
      id: 2,
      name: "Chào tân 1",
      amount: 2,
      startDay: "06/07/2002",
      endDay: "06/07/2002",
    },
    {
      id: 3,
      name: "Chào tân 2",
      amount: 2,
      startDay: "06/07/2002",
      endDay: "06/07/2002",
    },
    {
      id: 4,
      name: "Chào tân 3",
      amount: 2,
      startDay: "06/07/2002",
      endDay: "06/07/2002",
    },
    {
      id: 5,
      name: "Chào tân 4",
      amount: 2,
      startDay: "06/07/2002",
      endDay: "06/07/2002",
    },
    {
      id: 6,
      name: "Chào tân 5",
      amount: 2,
      startDay: "06/07/2002",
      endDay: "06/07/2002",
    },
    {
      id: 7,
      name: "Chào tân 6",
      amount: 2,
      startDay: "06/07/2002",
      endDay: "06/07/2002",
    },
    {
      id: 8,
      name: "Chào tân 7",
      amount: 2,
      startDay: "06/07/2002",
      endDay: "06/07/2002",
    },
    {
      id: 9,
      name: "Chào tân 8",
      amount: 2,
      startDay: "06/07/2002",
      endDay: "06/07/2002",
    },
    {
      id: 10,
      name: "Chào tân 9",
      amount: 2,
      startDay: "06/07/2002",
      endDay: "06/07/2002",
    },
  ];

  return (
    <div className="m-5">
      <div className="mx-auto my-0 w-[68.75rem]">
        {/* add event btn */}
        <label
          htmlFor="input_add-ev"
          className="btn w-36 mb-4 mr-3 float-right"
        >
          Thêm event
        </label>

        {/* Modal add event */}
        <input type="checkbox" id="input_add-ev" className="modal-toggle" />
        <label htmlFor="input_add-ev" className="modal">
          <label htmlFor="" className="w-[50rem]">
            <div className="modal-box max-w-none">
              {/* Wrapper for content */}
              <div className="flex flex-col gap-5">
                {/* Title */}
                <h3 className="text-2xl font-semibold pb-4 border-b-2 mb-2">
                  Thêm Event
                </h3>

                {/* Name + Number of participants */}
                <div className="flex justify-between mx">
                  <div className="form-control basis-2/3  max-w-sm pb-5">
                    <label htmlFor="input_title" className="label">
                      <span className="label-text font-semibold text-base">
                        Title
                        <span className="text-[red]">*</span>
                      </span>
                    </label>
                    <input
                      id="input_title"
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered "
                    />
                  </div>
                  <div className="form-control basis-1/3 w-full max-w-sm pb-5">
                    <label htmlFor="input_amount" className="label">
                      <span className="label-text font-semibold text-base">
                        Số lượng
                      </span>
                    </label>
                    <input
                      id="input_amount"
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>

                {/* Start day + end day */}
                <div className="flex mx gap-12">
                  <div className="flex flex-col w-full max-w-sm">
                    <label
                      className="label-text font-semibold text-base mb-2 inline-flex"
                      htmlFor="startDay"
                    >
                      Ngày bắt đầu
                      <span className="text-[red]">*</span>
                    </label>
                    <input
                      className="input input-bordered cursor-text rounded-lg w-full"
                      type="date"
                      id="startDay"
                    />
                  </div>
                  <div className="flex flex-col w-full max-w-sm">
                    <label
                      className="label-text font-semibold text-base mb-2 inline-flex"
                      htmlFor="endDay"
                    >
                      Ngày kết thúc
                    </label>
                    <input
                      className="input input-bordered cursor-text rounded-lg w-full"
                      type="date"
                      id="endDay"
                    />
                  </div>
                </div>
              </div>

              {/* Wrapper for accept or cancel */}
              <div className="modal-action">
                <button className="btn">Tạo</button>
              </div>
            </div>
          </label>
        </label>

        {/* table event */}
        <div className="overflow-x-auto w-full mb-6">{renderTable()}</div>

        {/* Modal delete event */}
        <input type="checkbox" id="input_del-ev" className="modal-toggle" />
        <label htmlFor="input_del-ev" className="modal">
          <div className="w-[30rem]">
            <div className="modal-box max-w-none">
              {/* Wrapper for content */}
              {/* Title */}
              <h3 className="text-2xl font-semibold pb-4 mb-5 text-center">
                Bạn có chắc chắn xóa event ... ?
              </h3>

              {/* Wrapper for accept or cancel */}
              <div className="flex justify-center items-center gap-6">
                <button className="btn min-w-[10rem] btn-error text-white">
                  Xóa
                </button>
                <label htmlFor="input_del-ev" className="btn min-w-[10rem]">
                  Hủy
                </label>
              </div>
            </div>
          </div>
        </label>

        {/* Navigation */}
        <div className="flex justify-center items-center">
          <div className="btn-group">
            <button className="btn" onClick={prevPage}>
              «
            </button>
            <button className="btn pointer-events-none">
              Page {currentPage}
            </button>
            <button className="btn" onClick={nextPage}>
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
