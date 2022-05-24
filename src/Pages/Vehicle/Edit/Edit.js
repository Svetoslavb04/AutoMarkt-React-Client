import './Edit.scss';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Compressor from 'compressorjs';

import { useLoadingContext } from '../../../contexts/LoadingContext';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNotificationContext, types } from '../../../contexts/NotificationContext';

import { editVehicle, getImageUploadUrl, getVehicle, getVehicleCategories } from '../../../services/vehicleService';

import { isValidVIN } from '../../../helpers/validator';

import { Typography, TextField, Fab, AddPhotoAlternateOutlined, Button, CloseIcon } from '../../../mui-imports'

import CommonPage from '../../CommonPage/CommonPage';
import SelectDropdown from '../../../Components/SelectDropdown/SelectDropdown';

const promisifiedCompressor = (file, options) => {
    return new Promise((resolve, reject) => {
        new Compressor(file, {
            ...options,
            success(result) {
                resolve(result);
            },
            error(error) {
                reject(undefined);
            }
        });
    });
}

export default function Edit() {

    const navigate = useNavigate();

    const { _id } = useParams();

    const { popNotification } = useNotificationContext();

    const { setIsLoading } = useLoadingContext();

    const { user } = useAuthContext();

    const [validity, setValidity] = useState({
        make: 'initial',
        model: 'initial',
        category: 'initial',
        description: 'initial',
        year: 'initial',
        mileage: 'initial',
        VIN: 'initial',
        price: 'initial',
        image: 'initial'
    })

    const [categories, setCategories] = useState([]);

    const [fields, setFields] = useState({
        make: undefined,
        model: undefined,
        description: undefined,
        category: undefined,
        year: undefined,
        mileage: undefined,
        VIN: undefined,
        price: undefined,
        image: undefined,
    });

    const [imageFileName, setImageFileName] = useState();

    useEffect(() => {

        Promise.allSettled([getVehicle(_id), getVehicleCategories(false)])
            .then(results => {

                if (results[0].status == 'rejected') {

                    navigate('/catalog', { replace: true });
                    return popNotification(results[0].reason, types.error);

                }

                if (results[0].value.publisherId != user._id) {

                    navigate('/login', { replace: true });
                    return popNotification('Unauthorized', types.error);
                    
                }
                
                setFields(fields => {

                    Object.keys(fields).forEach(key => {
                        fields[key] = results[0].value[key];
                    });

                    return { ...fields };
                })

                setValidity(validity => {

                    Object.keys(validity).forEach(key => {
                        validity[key] = results[0].value[key] ? true : 'initial';
                    });

                    return { ...validity };
                })

                setCategories(results[1].value || results[1].reason);
                setIsLoading(false);

            });

    }, []);

    const handleBlur = (valueType, e) => {

        const value = e.target.value;

        if (value.length == 0) {
            return setValidity(validity => {

                validity[valueType] = 'initial';

                return { ...validity };
            });
        }

        if (valueType == 'make' || valueType == 'model') {

            if (value.length < 2 || value.length > 99) {

                setValidity(validity => {

                    validity[valueType] = false;

                    return { ...validity };
                });

            } else {

                setValidity(validity => {

                    validity[valueType] = true;

                    return { ...validity };
                });

                setFields(fields => {

                    fields[valueType] = value;

                    return { ...fields };
                });

            }

        }

        if (valueType == 'year') {

            if (isNaN(value) || Number(value) > new Date().getFullYear() || Number(value) < 1900) {

                setValidity(validity => {
                    return { ...validity, year: false };
                });

            } else {

                setValidity(validity => { return { ...validity, year: true } });

                setFields(fields => { return { ...fields, year: Number(value) } });

            }
        }

        if (valueType == 'mileage') {

            if (isNaN(value) || Number(value) > 9999999 || Number(value) < 0) {

                setValidity(validity => {
                    return { ...validity, mileage: false };
                });

            } else {

                setValidity(validity => { return { ...validity, mileage: true } });

                setFields(fields => { return { ...fields, mileage: Number(value) } });

            }
        }

        if (valueType == 'VIN') {

            if (!isValidVIN(value)) {

                setValidity(validity => {
                    return { ...validity, VIN: false };
                });

            } else {

                setValidity(validity => { return { ...validity, VIN: true } });

                setFields(fields => { return { ...fields, VIN: value } });

            }
        }

        if (valueType == 'price') {

            if (isNaN(value) || Number(value) > 999999999 || Number(value) < 0) {

                setValidity(validity => { return { ...validity, price: false }; });

            } else {

                setValidity(validity => { return { ...validity, price: true } });

                setFields(fields => { return { ...fields, price: Number(value) } });

            }
        }
    }

    const handleCategoryChange = (value) => {

        setFields(fields => { return { ...fields, category: value } });

        setValidity(validity => { return { ...validity, category: true }; });

    }

    const handleDescriptionChange = (e) => {

        const value = e.target.value;

        setFields(fields => { return { ...fields, description: e.target.value } });

        if (value.length < 10 || value.length > 3000) {

            setValidity(validity => {
                return { ...validity, description: false };
            });

        } else {

            setValidity(validity => { return { ...validity, description: true } });

        }

    }

    const handleImageUpload = (e) => {

        setImageFileName(e.target.files[0].name);

        setFields(fields => { return { ...fields, image: e.target.files[0] } });

        setValidity(validity => { return { ...validity, image: true }; });

    }

    const handleRemoveImage = () => {

        setImageFileName(undefined);

        setFields(fields => { return { ...fields, image: undefined } });

        setValidity(validity => { return { ...validity, image: 'initial' }; });

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (Object.values(validity).some(field => !Boolean(field) || field == 'initial')) {
            return popNotification('All fields are required!', types.error);
        }

        let awsUrl;
        let imageUrl;

        try {

            const imageUploadRes = await getImageUploadUrl();

            awsUrl = imageUploadRes.awsUrl;
            imageUrl = imageUploadRes.imageUrl;

        } catch (error) { return popNotification(error, types.error); }

        try {
            let imageForUpload = await promisifiedCompressor(fields.image, {
                width: 2000,
                height: 1500,
                resize: 'cover'
            });

            await fetch(awsUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'multipart/formdata'
                },
                body: imageForUpload
            });
        } catch (error) { return popNotification('Failed to upload image') }

        try {
            const vehicle = await editVehicle({
                _id,
                make: fields.make,
                model: fields.model,
                description: fields.description,
                mileage: fields.mileage,
                year: fields.year,
                category: fields.category,
                VIN: fields.VIN,
                price: fields.price,
                imageUrl: imageUrl
            });

            return navigate(`/catalog/${_id}`, { replace: true });

        } catch (error) { return popNotification('Failed to edit vehicle!', types.error) }
    }

    return (
        <CommonPage breadcrumbs={['Home', 'Catalog', 'Edit Vehicle']}>
            <Typography variant='h3' component='h1' className='edit-header-text'>
                Edit Vehicle
            </Typography>
            <form action="POST" className='edit-form' onSubmit={handleSubmit}>
                <div className="edit-fragment-wrapper">
                    <div className="edit-make-model-category-header-wrapper">
                        <Typography variant='h5' component='h3'>
                            What are you selling?
                        </Typography>
                    </div>
                    <div className="edit-make-model-fields-wrapper">
                        <TextField
                            className="edit-form-text-field edit-form-make-model-text-field"
                            size='small'
                            label="Make"
                            variant="outlined"
                            name='make'
                            defaultValue={fields.make}
                            error={!validity.make}
                            helperText={validity.make ? '' : 'Invalid make'}
                            onBlur={handleBlur.bind(null, 'make')}
                        />
                        <TextField
                            className="edit-form-text-field edit-form-make-model-text-field"
                            size='small'
                            label="Model"
                            variant="outlined"
                            name='model'
                            defaultValue={fields.model}
                            error={!validity.model}
                            helperText={validity.model ? '' : 'Invalid model'}
                            onBlur={handleBlur.bind(null, 'model')}
                        />
                    </div>
                    <div className="edit-category-wrapper">
                        <SelectDropdown
                            defaultSelected='Choose category'
                            items={categories}
                            openButtonClassName='edit-category-open-button'
                            menuItemClassName='edit-category-menu-item'
                            onChange={handleCategoryChange}
                        />
                    </div>
                </div>
                <div className="edit-fragment-wrapper">
                    <div className="edit-details-header-wrapper">
                        <Typography variant='h5' component='h3'>
                            More details about you vehicle
                        </Typography>
                    </div>
                    <div className="edit-details-fields-wrapper">
                        <TextField
                            className="edit-form-text-field edit-form-year-text-field"
                            size='small'
                            label="Year"
                            variant="outlined"
                            name='year'
                            defaultValue={fields.year}
                            error={!validity.year}
                            helperText={validity.year ? '' : 'Invalid year'}
                            onBlur={handleBlur.bind(null, 'year')}
                            inputProps={{ maxLength: 4 }}
                        />
                        <TextField
                            className="edit-form-text-field edit-form-mileage-text-field"
                            size='small'
                            label="Mileage"
                            variant="outlined"
                            name='mileage'
                            defaultValue={fields.mileage}
                            error={!validity.mileage}
                            helperText={validity.mileage ? '' : 'Invalid mileage'}
                            onBlur={handleBlur.bind(null, 'mileage')}
                            inputProps={{ maxLength: 7 }}
                        />
                        <TextField
                            className="edit-form-text-field edit-form-vin-text-field"
                            size='small'
                            label="VIN Number"
                            variant="outlined"
                            name='VIN'
                            defaultValue={fields.VIN}
                            error={!validity.VIN}
                            helperText={validity.VIN ? '' : 'Invalid VIN Number'}
                            onBlur={handleBlur.bind(null, 'VIN')}
                            inputProps={{ maxLength: 17 }}
                        />
                    </div>
                </div>
                <div className="edit-fragment-wrapper">
                    <div className="edit-description-header-wrapper">
                        <Typography variant='h5' component='h3'>
                            Description
                        </Typography>
                    </div>
                    <div className="edit-description-field-wrapper">
                        <TextField
                            className="edit-form-description-text-field"
                            multiline
                            rows={10}
                            size='small'
                            label="Description"
                            variant="outlined"
                            name='description'
                            defaultValue={fields.description}
                            error={!validity.description}
                            helperText={validity.description ? '' : 'Invalid description'}
                            onBlur={handleBlur.bind(null, 'description')}
                            onChange={handleDescriptionChange}
                            inputProps={{ maxLength: 3000 }}
                        />
                        <div className="edit-description-indicator-wrapper">
                            {fields.description?.length < 10 || !fields.description
                                ? <Typography variant='body1'>Write at least more {10 - (fields.description?.length || 0)}</Typography>
                                : <></>
                            }
                            <Typography
                                variant='body1'
                                className='edit-description-length'
                            >
                                {fields.description?.length || 0}/3000
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className="edit-fragment-wrapper edit-image-wrapper">
                    <Typography variant='h5' component='h3'>
                        Upload image
                    </Typography>
                    <input
                        accept="image/*"
                        className='edit-image-input'
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleImageUpload}
                    />
                    <label htmlFor="contained-button-file">
                        <Fab component="span">
                            <AddPhotoAlternateOutlined />
                        </Fab>
                    </label>
                    {
                        fields.image
                            ? <div className="edit-remove-file-wrapper">
                                <Typography>{imageFileName}</Typography>
                                <CloseIcon
                                    className='edit-remove-image-icon'
                                    onClick={handleRemoveImage}
                                />
                            </div>
                            : <></>
                    }
                </div>
                <div className="edit-fragment-wrapper edit-price-wrapper">
                    <Typography variant='h5' component='h3'>
                        Price:
                    </Typography>
                    <TextField
                        className="edit-form-text-field edit-form-price-text-field"
                        size='small'
                        placeholder="Price"
                        variant="outlined"
                        name='price'
                        defaultValue={fields.price}
                        error={!validity.price}
                        helperText={validity.price ? '' : 'Invalid price'}
                        onBlur={handleBlur.bind(null, 'price')}
                        inputProps={{ maxLength: 9 }}
                        FormHelperTextProps={
                            {
                                sx: {
                                    position: 'absolute',
                                    top: '50px'
                                }
                            }
                        }
                    />
                    <Typography variant='h5' component='h3'>€</Typography>
                </div>
                <Button variant='contained' size='large' type='submit'>Edit</Button>
            </form>
        </CommonPage>
    )
}
