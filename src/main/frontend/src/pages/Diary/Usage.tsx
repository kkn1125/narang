import React, { useEffect } from "react";

function Usage() {
  useEffect(() => {
    // 카카오결제
    // axios({
    //   method: "post",
    //   url: url,
    //   params: {
    //     cid: "TC0ONETIME",
    //     partner_order_id: "a",
    //     partner_user_id: "a",
    //     item_name: "ohoraming",
    //     quantity: 1,
    //     total_amount: 5000,
    //     tax_free_amount: 10,
    //     approval_url: "http://localhost:3000",
    //     cancel_url: "http://localhost:3000",
    //     fail_url: "http://localhost:3000",
    //   },
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    //     Authorization: "KakaoAK c8a57b4921f2968cebd9f5187277d725",
    //   },
    // }).then((res) => {
    //   console.log(res.data);
    // });
  }, []);
  return <div>usage</div>;
}

export default Usage;
