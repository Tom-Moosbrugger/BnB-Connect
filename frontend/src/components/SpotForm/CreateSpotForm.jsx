import { SpotForm } from "./SpotForm";

export const CreateSpotForm = () => {
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