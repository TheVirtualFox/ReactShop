import React from 'react';
import CollectionOverviewContainer from '../../components/collections-overview/CollectionsOverviewContainer';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/CollectionPage';
import {firestore, converCollectionSnapshotToMap} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import {fetchCollectionsStartAsync} from '../../redux/shop/shop-actions';
import {createStructuredSelector} from "reselect";
import {selectIsCollectionFetching, selectIsCollectionsLoaded} from '../../redux/shop/shop-selector';

import WithSpinner from '../../components/with-spinner/WithSpinner';

// const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component {

    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
    }

    render() {
        const {match, isCollectionsLoaded} = this.props;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionOverviewContainer} />
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} /> } />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);