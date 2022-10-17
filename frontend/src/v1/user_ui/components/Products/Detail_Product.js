import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import {
  Get_All_Product_Initial,
  Get_Detail_Product_Initial,
} from "../../../redux/product_slice/Api_Redux_Thunk_Products";
import { reset_product_detail } from "../../../redux/product_slice/Product_Slice";
import {
  Loading_Button,
  Metadata,
  Rating,
  Relation_Product,
} from "../../imports/General_Global_Import";
import Lazy_Load_Img from "../../custom_hook/Lazy_Load_Img";
import STORAGES from "../../../utils/storage";
import Comment_product from "./Comment_Product";
const Detail_Product = () => {
  const [visible, setVisible] = useState(4);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { result_product_detail, loading } = useSelector((state) => ({
    ...state.Products_user,
  }));
  const getReplies = (commentId) => {
    return (
      result_product_detail &&
      result_product_detail[0].doc.reviews
        .slice(0, visible)
        .filter((backendComments) => backendComments._id === commentId)
    );
  };
  useEffect(() => {
    if (id) {
      dispatch(Get_Detail_Product_Initial(id));
    }
    return () => {
      dispatch(reset_product_detail());
    };
  }, [id]);
  return (
    <React.Fragment>
      {result_product_detail && (
        <>
          <Metadata title={`${result_product_detail[0].doc?.name}`} />
          <div className="container single-product">
            {loading ? (
              <Loading_Button />
            ) : (
              result_product_detail && (
                <div className="row">
                  <div className="col-md-6">
                    <TransformWrapper
                      initialScale={0.75}
                      initialPositionX={0}
                      initialPositionY={20}
                    >
                      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                        <React.Fragment>
                          <div className="single-image">
                            <TransformComponent>
                              <Lazy_Load_Img
                                url={result_product_detail[0].doc.image.url}
                              />
                            </TransformComponent>
                          </div>
                          <br />
                          <button
                            className="btn btn-success"
                            onClick={() => zoomIn()}
                          >
                            Zoom In +
                          </button>
                          &nbsp;&nbsp;
                          <button
                            className="btn btn-success"
                            onClick={() => zoomOut()}
                          >
                            Zoom Out -
                          </button>
                          &nbsp;&nbsp;
                          <button
                            className="btn btn-danger"
                            onClick={() => resetTransform()}
                          >
                            Return-X
                          </button>
                          <br />
                          <br />
                        </React.Fragment>
                      )}
                    </TransformWrapper>
                  </div>

                  <div className="col-md-6">
                    <div className="product-dtl">
                      <div className="product-info">
                        <div className="product-name">
                          {STORAGES.except(
                            result_product_detail[0].doc.name,
                            35
                          )}
                        </div>
                      </div>
                      <p>{result_product_detail[0].doc.description}</p>

                      <div className="product-count col-lg-7 ">
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Price</h6>
                          <span>${result_product_detail[0].doc.price}</span>
                        </div>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Status</h6>
                          {result_product_detail[0].doc.countInStock > 0 ? (
                            <span>In Stock</span>
                          ) : (
                            <span>End In Stock</span>
                          )}
                        </div>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Sold</h6>
                          {result_product_detail[0].doc?.sold > 0 ? (
                            <span>{result_product_detail[0].doc.sold} </span>
                          ) : (
                            <span>No Yet Has Bought</span>
                          )}
                        </div>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Reviews</h6>
                          <Rating
                            value={result_product_detail[0].doc?.rating}
                            text={`${result_product_detail[0].doc?.numReviews} reviews`}
                          />
                        </div>
                        {result_product_detail[0].doc?.countInStock > 0 ? (
                          <>
                            <div className="flex-box d-flex justify-content-between align-items-center">
                              <h6>CountIn Stock</h6>
                              <span>
                                {result_product_detail[0].doc?.countInStock}
                              </span>
                            </div>
                            <button className="round-black-btn">
                              Add To Cart
                            </button>
                          </>
                        ) : (
                          <div className="flex-box d-flex justify-content-between align-items-center">
                            <h6>CountIn Stock</h6>
                            <span style={{ color: "red" }}>Out Of Stock</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
            <Relation_Product />
            {/* {result_product_detail[0].doc.reviews.map((review, index) => {
              return <Comment_product comment={review} />;
            })} */}
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default Detail_Product;
