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
    
    if (reorderedImages.length < 5) {
        const numPlaceholders = 5 - reorderedImages.length;

        for (let i = 0; i < numPlaceholders; i++) {
            reorderedImages.push({ 
                id: 'placeholder' + i, 
                url: 'https://t4.ftcdn.net/jpg/03/76/40/81/240_F_376408140_kiazgwOvkEy0e50oxgF5kllIl7j2q1SQ.jpg', 
                preview: false 
            });
        }
    }
    
    return (
        <>
            {reorderedImages.map((image, idx) => (
                <img id={`spot-image-${idx + 1}`} key={image.id} src={image.url} alt={`Spot image ${image.id}`}/>
            ))}
        </>
    )
}

export default SpotImagesSection;