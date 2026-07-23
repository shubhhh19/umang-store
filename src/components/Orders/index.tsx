import React, { useEffect, useState } from "react";
import SingleOrder from "./SingleOrder";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/order`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setOrders(data.orders || []);
      })
      .catch(() => {
        setOrders([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-9.5 px-4 sm:px-7.5 xl:px-10">
        <p className="text-dark">Loading your orders...</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[770px]">
          {/* <!-- order item --> */}
          {orders.length > 0 && (
            <div className="items-center justify-between py-4.5 px-7.5 hidden md:flex ">
              <div className="min-w-[111px]">
                <p className="text-custom-sm text-dark">Order</p>
              </div>
              <div className="min-w-[175px]">
                <p className="text-custom-sm text-dark">Date</p>
              </div>

              <div className="min-w-[128px]">
                <p className="text-custom-sm text-dark">Status</p>
              </div>

              <div className="min-w-[213px]">
                <p className="text-custom-sm text-dark">Title</p>
              </div>

              <div className="min-w-[113px]">
                <p className="text-custom-sm text-dark">Total</p>
              </div>

              <div className="min-w-[113px]">
                <p className="text-custom-sm text-dark">Action</p>
              </div>
            </div>
          )}
          {orders.length > 0 ? (
            orders.map((orderItem, key) => (
              <SingleOrder key={key} orderItem={orderItem} smallView={false} />
            ))
          ) : (
            <p className="py-9.5 px-4 sm:px-7.5 xl:px-10 text-dark">
              You don&apos;t have any orders yet!
            </p>
          )}
        </div>

        {orders.length > 0 &&
          orders.map((orderItem, key) => (
            <SingleOrder key={key} orderItem={orderItem} smallView={true} />
          ))}
      </div>
    </>
  );
};

export default Orders;
