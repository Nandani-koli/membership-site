
const Pricing = (props) => {

  const handelSubmit = async ( {price} ) => {
    let result = await fetch('/api/payment', {
      method: 'POST',
      body: JSON.stringify( {price} )
    });
    let res = await result.json();
    window.location.href = res.result;
  }
  return (
<>
    <section className="pricing py-5 my-5">
      <div className="container">
        <div className="row">

          <div className="col-lg-4">
            <div className="card mb-5 mb-lg-0">
              <div className="card-body">
                <h5 className="card-title text-muted text-uppercase text-center">Basic</h5>
                <h6 className="card-price text-center">Rs.1</h6>
                <p className="period text-center">One Time Payment</p>
                <hr />
                <ul className="fa-ul">
                  <li><span className="fa-li"><i className="fas fa-check"></i></span>Single User</li>
                  <li><span className="fa-li"><i className="fas fa-check"></i></span>Update Profile</li>

                  <li className="text-muted"><span className="fa-li"><i className="fas fa-times"></i></span>Unlimited
                    upload documents</li>
                  <li className="text-muted"><span className="fa-li"><i className="fas fa-times"></i></span>Unlimited
                    upload images</li>
                </ul>
                <div className="d-grid">
                  {props.level == 1 ?  <button className="btn btn-primary text-uppercase" disabled
                        onClick={(e) => { handelSubmit({ price: 'price_1NdpGTSG64yrCfdE2x6cOc0p' }) }}>Purchased</button> 
                        :
                    (props.level == 2 || props.level == 3) ? <button className="btn btn-primary text-uppercase" disabled
                      onClick={(e) => { handelSubmit({ price: 'price_1NdpGTSG64yrCfdE2x6cOc0p' }) }}>Buy</button>
                      :
                      <button className="btn btn-primary text-uppercase"
                        onClick={(e) => { handelSubmit({ price: 'price_1NdpGTSG64yrCfdE2x6cOc0p' }) }}>Buy</button>
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card mb-5 mb-lg-0">
              <div className="card-body">
                <h5 className="card-title text-muted text-uppercase text-center">Plus</h5>
                <h6 className="card-price text-center">Rs.3</h6>
                <p className="period text-center">One Time Payment</p>
                <hr />
                <ul className="fa-ul">
                  <li><span className="fa-li"><i className="fas fa-check"></i></span>Single User</li>
                  <li><span className="fa-li"><i className="fas fa-check"></i></span>Update Profile</li>
                  <li><span className="fa-li"><i className="fas fa-check"></i></span>Unlimited Documents Upload</li>
                  <li className="text-muted"><span className="fa-li"><i className="fas fa-times"></i></span>Unlimited Image uploads</li>
                </ul>
                <div className="d-grid">
                  { props.level == 2 ? 
                    <button className="btn btn-primary text-uppercase" disabled
                    onClick={(e) => { handelSubmit({ price: 'price_1NdpRbSG64yrCfdEzXOcDRSa' }) }} >Purchased</button> 
                    : (props.level == 3) ? 
                    <button className="btn btn-primary text-uppercase" disabled
                    onClick={(e) => { handelSubmit({ price: 'price_1NdpRbSG64yrCfdEzXOcDRSa' }) }} >Buy</button> 
                    :
                    <button className="btn btn-primary text-uppercase"
                    onClick={(e) => { handelSubmit({ price: 'price_1NdpRbSG64yrCfdEzXOcDRSa' }) }} >Buy</button> 
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-muted text-uppercase text-center">Pro</h5>
                <h6 className="card-price text-center">Rs.5</h6>
                <p className="period text-center">One Time Payment</p>
                <hr />
                <ul className="fa-ul">
                  <li><span className="fa-li"><i className="fas fa-check"></i></span>Single User</li>
                  <li><span className="fa-li"><i className="fas fa-check"></i></span>Update Profile</li>
                  <li><span className="fa-li"><i className="fas fa-check"></i></span>Unlimited Documents Upload</li>
                  <li><span className="fa-li"><i className="fas fa-check"></i></span>Unlimited Image uploads</li>
                </ul>
                <div className="d-grid">
                  { props.level == 3? 
                  <button className="btn btn-primary text-uppercase" disabled
                  onClick={(e) => { handelSubmit({ price: 'price_1NdpSpSG64yrCfdE3qYGKR1x' }) }} >Purchased</button>
                  :
                    <button className="btn btn-primary text-uppercase"
                    onClick={(e) => { handelSubmit({ price: 'price_1NdpSpSG64yrCfdE3qYGKR1x' }) }} >Buy</button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Pricing