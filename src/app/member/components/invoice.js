'use client'
import html2pdf from "html2pdf.js";
import { useEffect, useState } from "react";
import Loading from "../loading";

const generatePdf = () => {
  let makepdf = document.getElementById('pdfcontent');

  var opt = {
    margin: 1,
    filename: 'Receipt.pdf',
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(makepdf).set(opt).save();
}

const Invoice = (props) => {

  const id = props.id;

  const [data, setdata] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        let res = await fetch(`/api/payment?orderid=${id}`);
        let data = await res.json();

        setdata(data.orderdetails)
        setIsLoading(false);

      } catch (error) {
        throw new Error(error);
      }
    })();
  }, [])

  return (
    <>
      <div className="card align-items-center justify-content-center m-5">
        <div className="card-body">
          <div className="container p-0">
            {!data && isLoading ? <Loading />
              :
              <>
                <section id="pdfcontent">
                  <h1 className='text-center m-5'>Order Details</h1>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="text-muted">
                        <h5 className="font-size-16 mb-3">Billed To:</h5>
                        <h5 className="font-size-15 mb-2">{data.shippingDetails.name}</h5>
                        <p className="mb-1">{data.shippingDetails.address.line}</p>
                        <p className="mb-1">{data.shippingDetails.address.city + ` ` + data.shippingDetails.address.postal_code}</p>
                        <p className="mb-1">{data.shippingDetails.address.state + `,` + data.shippingDetails.address.country}</p>
                      </div>
                      <p>{data.email}</p>
                      <p>{data.shippingDetails.phone}</p>
                    </div>
                    <div className Name="col-sm-4">
                      <div className="float-end font-size-15">Invoice #{data.invoiceNumber}<span className="badge bg-success font-size-12 ms-2">Paid</span>
                        <p className="mb-1">Date Paid :- {data.paymentDate}</p>
                        <p className="mb-1">Payment Method :- {data.card.brand + `-` + data.card.lastdigits}</p>
                      </div>
                      <br /> <br />
                    </div>


                    <div className="col-xl-4">
                      <p className='fw-bold'>Description</p>
                    </div>
                    <div className="col-xl-4">
                      <p className='fw-bold'>Qty</p>
                    </div>
                    <div className="col-xl-4">
                      <p className="float-end fw-bold">Amount</p>
                    </div>
                    <hr />
                  </div>
                  <div className="row">
                    <div className="col-xl-4">
                      <p>{data.orderName}</p>
                    </div>
                    <div className="col-xl-4">
                      <p>1</p>
                    </div>
                    <div className="col-xl-4">
                      <p className="float-end">&#x20B9; {data.price}.00</p>
                    </div>
                    <hr />
                  </div>

                  <div className="row text-black">

                    <div className="col-xl-12">
                      <p className="float-end fw-bold">Total: &#x20B9; {data.price}.00
                      </p>
                    </div>
                    <hr />
                  </div>
                </section>
              </>
            }
          </div></div></div>

      <div className="d-flex justify-content-center">
        <button className="btn btn-primary" onClick={generatePdf}>Download</button>
      </div>
    </>
  )
}

export default Invoice