const VerticalAd = ({imagePath}) => {
    return (
        <span className={"sticky-top"}>
            <br/>
            <img src={imagePath} className={"img-fluid"} alt={"ad"}></img>
        </span>
    )
}

export default VerticalAd