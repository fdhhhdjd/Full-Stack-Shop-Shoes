import React, { memo } from 'react'
import moment from 'moment';
const Order_Item_Two = ({ order_detail }) => {
  return (
    <React.Fragment> <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
      <div className="row">
        <div className="col-md-4 center">
          <div className="alert-success order-box">
            <i className="fas fa-truck-moving"></i>
          </div>
        </div>
        <div className="col-md-8 center ">
          <h5>
            <strong>Order info</strong>
          </h5>
          <p>
            Shipping:
            {order_detail.address && order_detail.address.country_code}
          </p>
          <p>Pay method: {order_detail && order_detail.paymentID}</p>
          {order_detail.status ? (
            <div className="bg-info p-2 col-12 mt-3">
              <p className="text-white text-center text-sm-start">
                Paid on {moment(order_detail.createdAt).calendar()}
              </p>
            </div>
          ) : (
            <div className="bg-danger p-2 col-12 mt-3">
              <p className="text-white text-center text-sm-start">
                Not Paid
              </p>
            </div>
          )}
        </div>
      </div>
    </div></React.Fragment>
  )
}

export default memo(Order_Item_Two)