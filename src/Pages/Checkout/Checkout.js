import './Checkout.scss';

import { useEffect, useReducer, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useLoadingContext } from '../../contexts/LoadingContext';
import { useShoppingCartContext } from '../../contexts/ShoppingCartContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';

import { Typography, TextField, Button, Checkbox } from '../../mui-imports';

import CommonPage from '../CommonPage/CommonPage';

import SelectDropdown from '../../Components/SelectDropdown/SelectDropdown';

import { getVehicles } from '../../services/vehicleService';
import { createOrder, getAllCountries } from '../../services/orderService';

import { areValidNotes, isEmail, isName, isPhoneNumber, isStreetName, isTownName, isZIP } from '../../helpers/validator';


const initialFields = {
    firstName: {
        value: '',
        valid: 'initial'
    },
    lastName: {
        value: '',
        valid: 'initial'
    },
    country: {
        value: '',
        valid: 'initial'
    },
    town: {
        value: '',
        valid: 'initial'
    },
    street: {
        value: '',
        valid: 'initial'
    },
    zip: {
        value: '',
        valid: 'initial'
    },
    email: {
        value: '',
        valid: 'initial'
    },
    phone: {
        value: '',
        valid: 'initial'
    },
    notes: {
        value: '',
        valid: true
    },
    terms: {
        valid: false
    }
}

const fieldsReducer = (state, action) => {
    if (action.field == 'firstName' || action.field == 'lastName') {

        state[action.field].value = action.value.target.value;

        state[action.field].valid = isName(action.value.target.value);

        if (action.value.target.value.length == 0) {

            state[action.field].valid = 'initial';

        }

        return { ...state };

    }

    if (action.field == 'country') {

        state.country = {
            value: action.value,
            valid: true
        };

        return { ...state };
    }

    if (action.field == 'town') {

        const value = action.value.target.value;

        state.town.value = value;

        state.town.valid = isTownName(value);

        if (value.length == 0) {
            state.town.valid = 'initial';
        }

        return { ...state };
    }

    if (action.field == 'street') {

        const value = action.value.target.value;

        state.street.value = value;

        state.street.valid = isStreetName(value);

        if (value.length == 0) {
            state.street.valid = 'initial';
        }

        return { ...state };
    }

    if (action.field == 'zip') {

        const value = action.value.target.value;

        state.zip.value = value;

        state.zip.valid = isZIP(value);

        if (value.length == 0) {
            state.zip.valid = 'initial';
        }

        return { ...state };
    }

    if (action.field == 'email') {

        const value = action.value.target.value;

        state.email.value = value;

        state.email.valid = isEmail(value);

        if (value.length == 0) {
            state.email.valid = 'initial';
        }

        return { ...state };
    }

    if (action.field == 'phone') {

        const value = action.value.target.value;

        state.phone.value = value;

        state.phone.valid = isPhoneNumber(value);

        if (value.length == 0) {
            state.phone.valid = 'initial';
        }

        return { ...state };
    }

    if (action.field == 'notes') {

        const value = action.value.target.value;
        state.notes.value = value;

        state.notes.valid = areValidNotes(value);

        if (value.length == 0) {
            state.notes.valid = true;
        }

        return { ...state };
    }

    if (action.field == 'terms') {

        state.terms.valid = !(state.terms.valid);

        return { ...state };

    }

    return { ...state };
}

export default function Checkout() {

    const navigate = useNavigate();

    const { setIsLoading } = useLoadingContext();

    const { shoppingCartItems } = useShoppingCartContext();

    const { popNotification } = useNotificationContext();

    const [vehicles, setVehicles] = useState();

    const [countries, setCountries] = useState();

    const [fields, dispatch] = useReducer(fieldsReducer, initialFields);

    useEffect(() => {

        getVehicles(shoppingCartItems)
            .then(vehicles => setVehicles(vehicles))
            .catch(err => setVehicles([]));

        getAllCountries()
            .then(countries => setCountries(countries))
            .catch(err => setCountries([]));

    }, [shoppingCartItems]);

    useEffect(() => {

        if (vehicles) {

            setIsLoading(false);

        }

    }, [setIsLoading, vehicles])

    const handleChange = (field, value) => dispatch({ field, value });

    const handlePlaceOrder = () => {

        let isEveryFieldValid = true;

        Object.values(fields).forEach(fieldData => {
            if (!fieldData.valid || fieldData.valid == 'initial') {

                isEveryFieldValid = false;
            }
        });

        if (!isEveryFieldValid) {

            return popNotification('All fields are required and should be valid!', types.error);

        }

        const order = {
            firstName: fields.firstName.value,
            lastName: fields.lastName.value,
            country: fields.country.value,
            town: fields.town.value,
            street: fields.street.value,
            zip: fields.zip.value,
            phone: fields.phone.value,
            email: fields.email.value,
        };

        if (fields.notes.value) {
            order.notes = fields.notes.value;
        }

        createOrder(order)
            .then(order => {
                
                popNotification(`Successfully Created Order #${order.number}!`, types.success);
                navigate('/checkout/success', { replace: true });

            })
            .catch(err => {

                if (err.messages) {
                    return err.messages.forEach(m => popNotification(m, types.error));
                }

                return popNotification(err.message, types.error);
            })
    }

    return (
        <CommonPage breadcrumbs={['Home', 'Shopping Cart', 'Checkout']}>
            <Typography variant='h3' component='h1' className='checkout-header-text'>
                Checkout
            </Typography>
            <div className="checkout-billing-total-wrapper">
                <div className="checkout-billing-wrapper">
                    <Typography variant='h4' component='h1' className='checkout-fragment-header-text'>
                        Billing Information
                    </Typography>
                    <div className="checkout-multiple-fields-wrapper">
                        <TextField
                            className="checkout-form-text-field checkout-form-text-field"
                            size='small'
                            label="First Name"
                            variant="outlined"
                            name='firstName'
                            error={!fields?.firstName.valid ? true : false}
                            helperText={!fields?.firstName.valid ? 'Invalid First Name' : ''}
                            onInput={handleChange.bind(null, 'firstName')}
                        />
                        <TextField
                            className="checkout-form-text-field checkout-form-text-field"
                            size='small'
                            label="Last Name"
                            variant="outlined"
                            name='lastName'
                            error={!fields?.lastName.valid ? true : false}
                            helperText={!fields?.lastName.valid ? 'Invalid Last Name' : ''}
                            onInput={handleChange.bind(null, 'lastName')}
                        />
                    </div>
                    <div className="checkout-field-wrapper">
                        <SelectDropdown
                            defaultSelected='Country'
                            items={countries || []}
                            onChange={handleChange.bind(null, 'country')}
                            menuClassName='checkout-countries-menu'
                        />
                    </div>
                    <div className="checkout-field-wrapper">
                        <TextField
                            className="checkout-form-text-field checkout-form-text-field"
                            size='small'
                            label="Town"
                            variant="outlined"
                            name='town'
                            error={!fields?.town.valid ? true : false}
                            helperText={!fields?.town.valid ? 'Invalid Town' : ''}
                            onInput={handleChange.bind(null, 'town')}
                        />
                    </div>
                    <div className="checkout-field-wrapper">
                        <TextField
                            className="checkout-form-text-field checkout-form-text-field"
                            size='small'
                            label="Street"
                            variant="outlined"
                            name='street'
                            error={!fields?.street.valid ? true : false}
                            helperText={!fields?.street.valid ? 'Invalid Street' : ''}
                            onInput={handleChange.bind(null, 'street')}
                        />
                    </div>
                    <div className="checkout-field-wrapper">
                        <TextField
                            className="checkout-form-text-field checkout-form-text-field"
                            size='small'
                            label="Post Code / ZIP"
                            variant="outlined"
                            name='postCode'
                            error={!fields?.zip.valid ? true : false}
                            helperText={!fields?.zip.valid ? 'Invalid Postal Code / ZIP' : ''}
                            onInput={handleChange.bind(null, 'zip')}
                        />
                    </div>
                    <div className="checkout-multiple-fields-wrapper">
                        <TextField
                            className="checkout-form-text-field checkout-form-text-field"
                            size='small'
                            label="Email"
                            variant="outlined"
                            name='email'
                            error={!fields?.email.valid ? true : false}
                            helperText={!fields?.email.valid ? 'Invalid Email' : ''}
                            onInput={handleChange.bind(null, 'email')}
                        />
                        <TextField
                            className="checkout-form-text-field checkout-form-text-field"
                            size='small'
                            label="Phone"
                            variant="outlined"
                            name='phone'
                            error={!fields?.phone.valid ? true : false}
                            helperText={!fields?.phone.valid ? 'Invalid Phone Number' : ''}
                            onInput={handleChange.bind(null, 'phone')}
                        />
                    </div>
                    <div className="checkout-fields-wrapper">
                        <TextField
                            className="checkout-form-text-field checkout-form-text-field"
                            size='small'
                            multiline
                            rows={4}
                            label="Notes"
                            variant="outlined"
                            name='notes'
                            error={!fields?.notes.valid ? true : false}
                            helperText={!fields?.notes.valid ? 'Notes too long' : ''}
                            onInput={handleChange.bind(null, 'notes')}
                        />
                        <div className="checkout-notes-indicator">
                            <Typography variant='body1'>{fields?.notes.value.length}/200</Typography>
                        </div>
                    </div>
                </div>
                <div className="checkout-order-wrapper">
                    <Typography variant='h4' component='h1' className='checkout-fragment-header-text'>
                        Order
                    </Typography>
                    <div className="checkout-order-heading-wrapper">
                        <Typography variant='body1' className='checkout-body-bold-text'>
                            Vehicle
                        </Typography>
                        <Typography variant='body1' className='checkout-body-bold-text'>
                            Price
                        </Typography>
                    </div>
                    <div className="checkout-order-vehicles-wrapper">
                        {
                            vehicles
                                ? vehicles.map(v => (
                                    <div key={v._id} className="checkout-row-wrapper">
                                        <Typography variant='body1'>
                                            {v.make} {v.model}
                                        </Typography>
                                        <Typography variant='body1'>
                                            €{v.price.toFixed(2)}
                                        </Typography>
                                    </div>
                                ))
                                : <></>
                        }
                    </div>
                    <div className="checkout-subtotal-wrapper">
                        <div className="checkout-row-wrapper">
                            <Typography variant='body1' className='checkout-body-bold-text'>
                                Subtotal
                            </Typography>
                            <Typography variant='body1'>
                                €{vehicles ? (vehicles.reduce((prev, curr) => prev + curr.price, 0)).toFixed(2) : 0}
                            </Typography>
                        </div>
                        <div className="checkout-row-wrapper">
                            <Typography variant='body1' className='checkout-body-bold-text'>
                                Tax
                            </Typography>
                            <Typography variant='body1'>
                                €{(0).toFixed(2)}
                            </Typography>
                        </div>
                    </div>
                    <div className="checkout-total-wrapper">
                        <Typography variant='h5' className='checkout-body-bold-text'>
                            Total
                        </Typography>
                        <Typography variant='body1'>
                            €{vehicles ? (vehicles.reduce((prev, curr) => prev + curr.price, 0)).toFixed(2) : 0}
                        </Typography>
                    </div>
                    <div
                        className="checkout-agree-terms-wrapper"
                        onClick={handleChange.bind(null, 'terms')}
                    >
                        <div className="checkout-agree-terms-checkbox-wrapper">
                            <Checkbox
                                size="small"
                                className="checkout-agree-terms-checkbox"
                                checked={fields.terms.valid}
                            />
                        </div>
                        <Typography variant='body1' className='checkout-agree-terms-text'>
                            I have read and agree to the website terms and conditions
                        </Typography>
                    </div>
                    <div className="checkout-place-order-wrapper">
                        <Button
                            variant='contained'
                            onClick={handlePlaceOrder}
                        >
                            Place Order
                        </Button>
                    </div>
                </div>
            </div>
        </CommonPage >
    )
}
