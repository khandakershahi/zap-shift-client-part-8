import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParmas] = useSearchParams();
  const [paymentInfo, setpaymentInfo] = useState({});

  const sessionId = searchParmas.get("session_id");

  const axiosSecure = useAxiosSecure();

  // console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setpaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div>
      <h2 className="text-4xl">Payment Successfull</h2>
      <p>Your transactionId: {paymentInfo?.transactionId}</p>
      <p>Your Parcel Tracking id: {paymentInfo?.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
