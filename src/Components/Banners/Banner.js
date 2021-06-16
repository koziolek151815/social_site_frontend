const Banner = ({imagePath}) => {
    return (
        <div className={"text-center py-2"}>
            <img src={imagePath} className={"img-fluid"} alt={"ad"}></img>
        </div>
    )
}

export default Banner