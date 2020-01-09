const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = 'AIzaSyCeC6VSTSjx5AIQI8MjNSGTYy0zkkg1PXY';

function searchAddressHandler(event: Event){
    event.preventDefault();
    const enteredAddress = addressInput.value;
}

form.addEventListener('submit',searchAddressHandler);