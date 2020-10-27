import ShopActionTypes from './shop-types';
import {converCollectionSnapshotToMap, firestore} from "../../firebase/firebase.utils";

// export const updateCollections = (collectionsMap) => ({
//     type: ShopActionTypes.UPDATE_COLLECTIONS,
//     payload: collectionsMap
// });

export const fetchCollectionsStart = () => ({
   type: ShopActionTypes.FETCH_COLLECTIONS_START
});


export const fetchCollectionsSuccess = (collectionMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionMap
});



export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());
        collectionRef.get().then(snapshot => {
                const collectionsMap = converCollectionSnapshotToMap(snapshot);
                dispatch(fetchCollectionsSuccess(collectionsMap));
            }
        ).catch(error => dispatch(fetchCollectionsFailure(error.message)));
    }
};

export const fetchCollectionsFailure = (errorMessage) => ({
   type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});