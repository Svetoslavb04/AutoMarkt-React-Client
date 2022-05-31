import './Create.scss';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Compressor from 'compressorjs';

import { useLoadingContext } from '../../../contexts/LoadingContext';
import { useNotificationContext, types } from '../../../contexts/NotificationContext';

import { createVehicle, getImageUploadUrl, getVehicleCategories } from '../../../services/vehicleService';

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

export default function Create() {

    const navigate = useNavigate();

    const { popNotification } = useNotificationContext();

    const { setIsLoading } = useLoadingContext();

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

        getVehicleCategories(false)
            .then(categories => {
                
                setCategories(categories);
                setIsLoading(false);

            })
            .catch(err => setIsLoading(false));

    }, [setIsLoading]);

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
            const vehicle = await createVehicle({
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
            
            return navigate(`/catalog/${vehicle._id}`, { replace: true });

        } catch (error) { return popNotification('Failed to create vehicle!', types.error) }
    }

    return (
        <CommonPage breadcrumbs={['Home', 'Catalog', 'Sell Vehicle']}>
            <Typography variant='h3' component='h1' className='create-header-text'>
                Sell Vehicle
            </Typography>
            <form action="POST" className='create-form' onSubmit={handleSubmit}>
                <div className="create-fragment-wrapper">
                    <div className="create-make-model-category-header-wrapper">
                        <Typography variant='h5' component='h3'>
                            What are you selling?
                        </Typography>
                    </div>
                    <div className="create-make-model-fields-wrapper">
                        <TextField
                            className="create-form-text-field create-form-make-model-text-field"
                            size='small'
                            label="Make"
                            variant="outlined"
                            name='make'
                            error={!validity.make}
                            helperText={validity.make ? '' : 'Invalid make'}
                            onBlur={handleBlur.bind(null, 'make')}
                        />
                        <TextField
                            className="create-form-text-field create-form-make-model-text-field"
                            size='small'
                            label="Model"
                            variant="outlined"
                            name='model'
                            error={!validity.model}
                            helperText={validity.model ? '' : 'Invalid model'}
                            onBlur={handleBlur.bind(null, 'model')}
                        />
                    </div>
                    <div className="create-category-wrapper">
                        <SelectDropdown
                            defaultSelected='Choose category'
                            items={categories}
                            openButtonClassName='create-category-open-button'
                            menuItemClassName='create-category-menu-item'
                            onChange={handleCategoryChange}
                        />
                    </div>
                </div>
                <div className="create-fragment-wrapper">
                    <div className="create-details-header-wrapper">
                        <Typography variant='h5' component='h3'>
                            More details about you vehicle
                        </Typography>
                    </div>
                    <div className="create-details-fields-wrapper">
                        <TextField
                            className="create-form-text-field create-form-year-text-field"
                            size='small'
                            label="Year"
                            variant="outlined"
                            name='year'
                            error={!validity.year}
                            helperText={validity.year ? '' : 'Invalid year'}
                            onBlur={handleBlur.bind(null, 'year')}
                            inputProps={{ maxLength: 4 }}
                        />
                        <TextField
                            className="create-form-text-field create-form-mileage-text-field"
                            size='small'
                            label="Mileage"
                            variant="outlined"
                            name='mileage'
                            error={!validity.mileage}
                            helperText={validity.mileage ? '' : 'Invalid mileage'}
                            onBlur={handleBlur.bind(null, 'mileage')}
                            inputProps={{ maxLength: 7 }}
                        />
                        <TextField
                            className="create-form-text-field create-form-vin-text-field"
                            size='small'
                            label="VIN Number"
                            variant="outlined"
                            name='VIN'
                            error={!validity.VIN}
                            helperText={validity.VIN ? '' : 'Invalid VIN Number'}
                            onBlur={handleBlur.bind(null, 'VIN')}
                            inputProps={{ maxLength: 17 }}
                        />
                    </div>
                </div>
                <div className="create-fragment-wrapper">
                    <div className="create-description-header-wrapper">
                        <Typography variant='h5' component='h3'>
                            Description
                        </Typography>
                    </div>
                    <div className="create-description-field-wrapper">
                        <TextField
                            className="create-form-description-text-field"
                            multiline
                            rows={10}
                            size='small'
                            label="Description"
                            variant="outlined"
                            name='description'
                            error={!validity.description}
                            helperText={validity.description ? '' : 'Invalid description'}
                            onBlur={handleBlur.bind(null, 'description')}
                            onChange={handleDescriptionChange}
                            inputProps={{ maxLength: 3000 }}
                        />
                        <div className="create-description-indicator-wrapper">
                            {fields.description?.length < 10 || !fields.description
                                ? <Typography variant='body1'>Write at least more {10 - (fields.description?.length || 0)}</Typography>
                                : <></>
                            }
                            <Typography
                                variant='body1'
                                className='create-description-length'
                            >
                                {fields.description?.length || 0}/3000
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className="create-fragment-wrapper create-image-wrapper">
                    <Typography variant='h5' component='h3'>
                        Upload image
                    </Typography>
                    <input
                        accept="image/*"
                        className='create-image-input'
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
                            ? <div className="create-remove-file-wrapper">
                                <Typography>{imageFileName}</Typography>
                                <CloseIcon
                                    className='create-remove-image-icon'
                                    onClick={handleRemoveImage}
                                />
                            </div>
                            : <></>
                    }
                </div>
                <div className="create-fragment-wrapper create-price-wrapper">
                    <Typography variant='h5' component='h3'>
                        Price:
                    </Typography>
                    <TextField
                        className="create-form-text-field create-form-price-text-field"
                        size='small'
                        placeholder="Price"
                        variant="outlined"
                        name='price'
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
                <Button variant='contained' size='large' type='submit'>Create</Button>
            </form>
        </CommonPage>
    )
}
