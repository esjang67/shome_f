import CouponList from "../component/coupon/CouponList";
import CouponTime from "../component/coupon/CouponTime";

function CouponAdmin(){
  return(
    <div className="CouponAdmin">
      <div> 관리자 </div>
      <CouponTime />

      <h2>쿠폰 리스트</h2>
      <CouponList grade={"P"} userid={''} />
    </div>
  )
}

export default CouponAdmin;