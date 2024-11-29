
const SkillCard = (props) => {
    return (
        <>
            <div className="card  bg-gradient border p-3 mt-4">
                <div className="card-body">
                    <div className="card-title mt-3 text-dark">{props.title}</div>
                    <p className="card-text mt-3 text-dark">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde sapiente reiciendis dolore! Praesentium dignissimos exercitationem suscipit cum eius quae iure quibusdam, est libero error asperiores assumenda magnam quaerat at obcaecati.</p>
                </div>
            </div>
        </>
    )
}

export default SkillCard