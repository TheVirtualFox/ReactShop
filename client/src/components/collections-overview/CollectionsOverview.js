import React from 'react';
import './CollectionsOverview.scss';
import {connect} from 'react-redux';
import { createStructuredSelector} from "reselect";
import CollectionPreview from '../collection-preview/CollectionPreview';
import {selectCollectionForPreview} from "../../redux/shop/shop-selector";

const CollectionOverview = ({ collections }) => (
    <div className="collection-overview">
        {
            collections
                .map(({id, ...otherCollectionProps}) => (
                    <CollectionPreview key={id} {...otherCollectionProps} />
                ))
        }
    </div>
);


const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
});

export default connect(mapStateToProps)(CollectionOverview);