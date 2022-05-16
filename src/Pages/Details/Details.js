import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getVehicle } from "../../services/vehicleService";

import { useLoadingContext } from "../../contexts/LoadingContext";

import { Typography, Button, CircularProgress, FavoriteIcon } from "../../mui-imports";

import CommonPage from "../CommonPage/CommonPage";

import './Details.scss';

export default function Details(props) {

    const { _id } = useParams();

    const { isLoading, setIsLoading } = useLoadingContext();

    const [vehicle, setVehicle] = useState({});


    useEffect(() => {
        setIsLoading(true);
        getVehicle(_id)
            .then(vehicle => {
                setVehicle(vehicle);
                setIsLoading(false);
            });

    }, []);

    return (
        <CommonPage
            breadcrumbs={
                isLoading
                    ? []
                    : ['Home', 'Catalog', `${vehicle.make} ${vehicle.model}`]
            }
        >
            <div className="details-info-wrapper">
                <div className="details-image-wrapper">
                    {
                        isLoading
                            ? <CircularProgress sx={{ margin: 'auto' }} />
                            : <img className="details-image" src={vehicle.imageUrl} alt="vehicle image" />
                    }
                </div>
                <div className="details-info">
                    <div className="details-heading-wrapper">
                        <h1 className="details-info-heading-text">{vehicle.make}</h1>
                        <h1 className="details-info-heading-text">{vehicle.model}</h1>
                    </div>
                    <div className="details-description-wrapper">
                        <Typography
                            component="p"
                            className="details-info-description-text"
                        >
                            {vehicle.description?.length >= 200
                                ? vehicle.description.slice(0, 200) + '...'
                                : vehicle.description

                            }
                        </Typography>
                    </div>
                    <div className="details-meta-wrapper">
                        <Typography
                            component="p"
                            className="details-info-meta-text"
                        >
                            Year: {vehicle.year}
                        </Typography>
                        <Typography
                            component="p"
                            className="details-info-meta-text"
                        >
                            Mileage: {vehicle.mileage}
                        </Typography>
                        <Typography
                            component="p"
                            className="details-info-meta-text"
                        >
                            VIN: {vehicle.VIN}
                        </Typography>
                    </div>
                    <div className="details-price-wrapper">
                        <Typography
                            component="p"
                            className="details-info-price-text"
                        >
                            €{vehicle.price}
                        </Typography>
                    </div>
                    <div className="details-buy-wrapper">
                        <Button
                            variant="contained"
                            className="details-info-buy-now-text"
                        >
                            Add to Cart
                        </Button>
                        <Button
                            component='p'
                            className="details-info-wish-list-icon"
                            variant="contained"
                        >
                            <FavoriteIcon className="details-wish-list-icon" />
                        </Button>
                    </div>
                </div>
            </div>
        </CommonPage>
    )
}