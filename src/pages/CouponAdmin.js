import { Box } from "@mui/material";
import CouponList from "../component/coupon/CouponList";
import CouponTime from "../component/coupon/CouponTime";
import { useState } from "react";

function CouponAdmin(){
  const [change, setChange] = useState(true);

  return(
    <div className="CouponAdmin">
      <Box sx={{mb:1}}>
        <CouponTime setChange={setChange} />
      </Box>

      <CouponList grade={"P"} userid={''} change={change} />
    </div>
  )
}

export default CouponAdmin;