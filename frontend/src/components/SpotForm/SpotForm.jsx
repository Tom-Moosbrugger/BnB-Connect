import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { SiComma } from "react-icons/si";
import { FiDollarSign } from "react-icons/fi";
import * as spotActions from '../../store/spots';
import './SpotForm.css';

const SpotForm = ({ formData, formType }) => {
    const { spotId } = useParams();
    const [country, setCountry] = useState(formData?.country || '');
    const [address, setAddress] = useState(formData?.address || '');
    const [city, setCity] = useState(formData?.city || '');
    const [state, setState] = useState(formData?.state || '');
    const [lat, setLat] = useState(formData?.lat || '');
    const [lng, setLng] = useState(formData?.lng || '');
    const [description, setDescription] = useState(formData?.description || '');
    const [name, setName] = useState(formData?.name || '');
    const [price, setPrice] = useState(formData?.price || '');
    const [previewImage, setPreviewImage] = useState('');
    const [otherImage1, setOtherImage1] = useState('');
    const [otherImage2, setOtherImage2] = useState('');
    const [otherImage3, setOtherImage3] = useState('');
    const [otherImage4, setOtherImage4] = useState('');
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const validationErrors = {};

        if (!country) validationErrors.country = 'Country is required';
        
        if (!address) validationErrors.address = 'Address is required';
        
        if (!city) validationErrors.city = 'City is required';
        
        if (!state) validationErrors.state = 'State is required';
        
        if (!lat) {
            validationErrors.lat = 'Latitude is required';
        } else if (lat < -90 || lat > 90) {
            validationErrors.lat = 'Latitude must be within -90 and 90'
        }
    
        if (!lng) {
            validationErrors.lng = 'Longitude is required';
        } else if (lng < -180 || lng > 180) {
            validationErrors.lat = 'Longitude must be within -180 and 180';
        }
        
        if (!description) {
            validationErrors.description = 'Description is required';
        } else if (description.length < 30) {
            validationErrors.description = 'Description needs a minimum of 30 characters';
        } else if (description.length > 255) {
            validationErrors.description = 'Description can be a maximum of 30 characters';
        }
        
        if (!name) {
            validationErrors.name = 'Name is required'
        } else if (name.length >= 50) {
            validationErrors.name = 'Name must be less than 50 characters'
        }

        if (!price) validationErrors.price = 'Price is required';

        if (formType === 'createSpot' && !previewImage) {
            validationErrors.previewImage = 'Preview image is required';
        } else if (formType === 'createSpot' && !previewImage.endsWith('.png') && !previewImage.endsWith('.jpg') && !previewImage.endsWith('.jpeg')) {
            validationErrors.previewImage = 'Image URL must end in .png, .jpg, .jpeg';
        }

        if (otherImage1 && !otherImage1.endsWith('.png') && !otherImage1.endsWith('.jpg') && !otherImage1.endsWith('.jpeg')) validationErrors.otherImage1 = 'Image URL must end in .png, .jpg, .jpeg';
        if (otherImage2 && !otherImage2.endsWith('.png') && !otherImage2.endsWith('.jpg') && !otherImage2.endsWith('.jpeg')) validationErrors.otherImage2 = 'Image URL must end in .png, .jpg, .jpeg';
        if (otherImage3 && !otherImage3.endsWith('.png') && !otherImage3.endsWith('.jpg') && !otherImage3.endsWith('.jpeg')) validationErrors.otherImage3 = 'Image URL must end in .png, .jpg, .jpeg';
        if (otherImage4 && !otherImage4.endsWith('.png') && !otherImage4.endsWith('.jpg') && !otherImage4.endsWith('.jpeg')) validationErrors.otherImage4 = 'Image URL must end in .png, .jpg, .jpeg';

        setErrors(validationErrors);
    }, [country, address, city, state, lat, lng, description, name, price, previewImage, otherImage1, otherImage2, otherImage3, otherImage4, formType]);

    const fillTestInfo = () => {
        setCountry('United States of America');
        setAddress('1453 Test Avenue');
        setCity('Test Town');
        setState('MD');
        setLat(80);
        setLng(120);
        setDescription('This is a test description for the purposes of testing the functionality of this input')
        setName('Test Spot');
        setPrice(120);
        setPreviewImage('https://cdn.pixabay.com/photo/2021/01/05/01/15/home-5889366_1280.jpg');
        setOtherImage1('https://cdn.pixabay.com/photo/2021/08/05/07/55/daffodils-6523446_1280.jpg');
        setOtherImage2('https://cdn.pixabay.com/photo/2017/01/07/17/48/interior-1961070_1280.jpg');
        setOtherImage3('https://cdn.pixabay.com/photo/2017/06/10/16/22/coffee-2390136_1280.jpg');
        setOtherImage4('https://cdn.pixabay.com/photo/2016/04/18/13/53/room-1336497_1280.jpg');

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(errors).length > 0) return setHasSubmitted(true);

        let spotImages = [{ url: previewImage, preview: true }];

        if (otherImage1) spotImages.push({ url: otherImage1, preview: false });
        if (otherImage2) spotImages.push({ url: otherImage2, preview: false });
        if (otherImage3) spotImages.push({ url: otherImage3, preview: false });
        if (otherImage4) spotImages.push({ url: otherImage4, preview: false });

        const spot = {
            country,
            address,
            city,
            state,
            lat,
            lng,
            description,
            name,
            price
        }

        if (formType === 'createSpot') {
            const newSpot = await dispatch(spotActions.createSpotThunk(spot))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data?.errors) return setErrors(data.errors);
                }
            );

            await dispatch(spotActions.addSpotImagesThunk(spotImages, newSpot.id));
            
            navigate(`/spots/${newSpot.id}`);
        } else {
            await dispatch(spotActions.editSpotThunk(spot, spotId))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data?.errors) return setErrors(data.errors);
                }
            );

            navigate(`/spots/${spotId}`);
        }
    }

    return (
        <article className="spot-form-container">
            {formType === 'createSpot' && <h2>Create a new Spot</h2>}
            {formType === 'editSpot' && <h2>Update your Spot</h2>}
            <div className="spot-form-test-info">
                <span onClick={fillTestInfo}>Fill in Test Information</span>
            </div>
            <form className="spot-form" onSubmit={handleSubmit}>
                <section className="spot-form-location">
                    <header>
                        <h3>Where&apos;s your place located?</h3>
                        <p>Guests will only get your exact address once they booked a reservation.</p>
                    </header>
                    <div className="spot-form-input">
                        <label>Country <span className={hasSubmitted && errors.country ? "error-message" : "error-message hidden"}>{errors.country}</span></label>
                        <input 
                        type='text'
                        placeholder="Country"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        />
                    </div>
                    <div className="spot-form-input">
                        <label>Street Address <span className={hasSubmitted && errors.address ? "error-message" : "error-message hidden"}>{errors.address}</span></label>
                        <input 
                        type='text'
                        placeholder="Address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="spot-form-input">
                        <div id="city-state">
                            <div id="city">
                                <label>City <span className={hasSubmitted && errors.city ? "error-message" : "error-message hidden"}>{errors.city}</span></label>
                                <input 
                                id="city"
                                type='text'
                                placeholder="City"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                />
                            </div>
                            <span className="comma"><SiComma /></span>
                            <div id="state">
                                <label>State <span className={hasSubmitted && errors.state ? "error-message" : "error-message hidden"}>{errors.state}</span></label>
                                <input
                                id="state"
                                type='text'
                                placeholder="State"
                                value={state}
                                onChange={e => setState(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="spot-form-input">
                        <div id="lat-long">
                            <div id="lat">
                                <label>Latitude <span className={hasSubmitted && errors.lat ? "error-message" : "error-message hidden"}>{errors.lat}</span></label>
                                <input 
                                type='number'
                                placeholder="Latitude"
                                value={lat}
                                onChange={e => setLat(e.target.value)}
                                />
                            </div>
                            <span className="comma"><SiComma /></span>
                            <div id="long">
                                <label>Longitude <span className={hasSubmitted && errors.lng ? "error-message" : "error-message hidden"}>{errors.lng}</span></label>
                                <input
                                type='number'
                                placeholder="Longitude"
                                value={lng}
                                onChange={e => setLng(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="spot-form-description">
                    <header>
                        <h3>Describe your place to guests</h3>
                        <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                    </header>
                    <textarea
                        rows={7}
                        placeholder="Please write at least 30 characters"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <div className="error-message-container">
                        <p className={hasSubmitted && errors.description ? "error-message" : "error-message hidden"}>{errors.description}</p>
                    </div>
                </section>
                <section className="spot-form-title">
                    <header>
                        <h3>Create a title for your spot</h3>
                        <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                    </header>
                    <input 
                        type="text"
                        placeholder="Name of your spot"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <div className="error-message-container">
                        <p className={hasSubmitted && errors.name ? "error-message" : "error-message hidden"}>{errors.name}</p>
                    </div>
                </section>
                <section className="spot-form-price">
                    <header>
                        <h3>Set a base price for your spot</h3>
                        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    </header>
                    <div id="price">
                        <span id="dollar-sign"><FiDollarSign /></span>   
                        <input 
                            type="number"
                            placeholder="Price per night (USD)"
                            min={0}
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="error-message-container">
                        <p className={hasSubmitted && errors.price ? "error-message" : "error-message hidden"}>{errors.price}</p>
                    </div>
                </section>
                {formType === 'createSpot' && <section className="spot-form-images">
                    <header>
                        <h3>Liven up your spot with photos</h3>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                    </header>
                    <div className="images-container">
                        <input 
                            type="text"
                            placeholder="Preview Image URL"
                            value={previewImage}
                            onChange={e => setPreviewImage( e.target.value)}
                        />
                        <div className="error-message-container">
                            <p className={hasSubmitted && errors.previewImage ? "error-message" : "error-message hidden"}>{errors.previewImage}</p>
                        </div>
                        <input 
                            type="text"
                            placeholder="Image URL"
                            value={otherImage1}
                            onChange={e => setOtherImage1(e.target.value)}
                        />
                        <div className="error-message-container">
                            <p className={hasSubmitted && errors.otherImage1 ? "error-message" : "error-message hidden"}>{errors.otherImage1}</p>
                        </div>
                        <input 
                            type="text"
                            placeholder="Image URL"
                            value={otherImage2}
                            onChange={e => setOtherImage2(e.target.value)}
                        />
                        <div className="error-message-container">
                            <p className={hasSubmitted && errors.otherImage2 ? "error-message" : "error-message hidden"}>{errors.otherImage2}</p>  
                        </div>
                        <input 
                            type="text"
                            placeholder="Image URL"
                            value={otherImage3}
                            onChange={e => setOtherImage3(e.target.value)}
                        />
                        <div className="error-message-container">
                            <p className={hasSubmitted && errors.otherImage3 ? "error-message" : "error-message hidden"}>{errors.otherImage3}</p>
                        </div>
                        <input 
                            type="text"
                            placeholder="Image URL"
                            value={otherImage4}
                            onChange={e => setOtherImage4(e.target.value)}
                        />
                        <div className="error-message-container">
                            <p className={hasSubmitted && errors.otherImage4 ? "error-message" : "error-message hidden"}>{errors.otherImage4}</p>
                        </div>
                    </div>
                </section>}
                <section id="submit-spot-form">
                    {formType === 'createSpot' && <button type='submit' id="submit-spot-button">Create Spot</button>}
                    {formType === 'editSpot' && <button type='submit' id="submit-spot-button">Update your Spot</button>}
                </section>
            </form>
        </article>
    );
};

export default SpotForm;