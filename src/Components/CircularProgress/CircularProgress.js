import { useIsLoadingContext } from "../../contexts/IsLoadingContext";

import { CircularProgress } from "../../mui-imports";

export default function CustomCircularProgress (props) {

    const { isLoading } = useIsLoadingContext();

    const style = {};

    if (!isLoading) {
        style.display = 'none';
    }

    return (
        <CircularProgress style={style} {...props} />
    )
}