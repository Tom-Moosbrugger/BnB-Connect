import SpotForm from "./SpotForm";

const CreateSpotForm = () => {
    const formData = {
        country: '',
        address: '',
        state: '',
        lat: '',
        long: '',
        name: '',
        description: '',
        price: ''
    }

    return (
        <SpotForm formData={formData} formType='createSpot'/>
    )
}

export default CreateSpotForm;