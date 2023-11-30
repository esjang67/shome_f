import { Box } from "@mui/material";
import CouponList from "../component/coupon/CouponList";
import CouponTime from "../component/coupon/CouponTime";
import { useState } from "react";
import SelectKids from "../component/SelectKids";

function CouponAdmin(){
  const [change, setChange] = useState(true);
  const [kids, setKids] = useState("MIN");

  return(
    <div className="CouponAdmin">
      <Box sx={{mb:1}}>
        <CouponTime setChange={setChange} />
      </Box>
      <SelectKids kids={kids} setKids={setKids}/>
      <CouponList grade={"P"} userid={''} change={change} kids={kids} />
    </div>
  )
}

export default CouponAdmin;