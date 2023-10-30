import { Box } from "@mui/material";
import CouponList from "../component/coupon/CouponList";
import CouponTime from "../component/coupon/CouponTime";

function CouponAdmin(){
  return(
    <div className="CouponAdmin">
      <Box sx={{mb:1}}>
        <CouponTime />
      </Box>

      <CouponList grade={"P"} userid={''} />
    </div>
  )
}

export default CouponAdmin;