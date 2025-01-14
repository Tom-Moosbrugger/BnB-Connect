const SpotImagesSection = ({ spotImages }) => {
    if (!spotImages) return <p>images loading...</p>
    
    let reorderedImages = [];

    spotImages.forEach(spotImage => {
        if (spotImage.preview === true) {
            reorderedImages.unshift(spotImage);
        } else {
            reorderedImages.push(spotImage);
        }
    });
    
    return (
        <>
            {reorderedImages.map((image, idx) => (
                <img id={`spot-image-${idx + 1}`} key={image.id} src={image.url} alt={`Spot image ${image.id}`}/>
            ))}
        </>
    )
}

export default SpotImagesSection;