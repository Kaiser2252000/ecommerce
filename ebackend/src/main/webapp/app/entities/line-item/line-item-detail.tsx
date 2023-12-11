import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './line-item.reducer';

export const LineItemDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const lineItemEntity = useAppSelector(state => state.lineItem.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="lineItemDetailsHeading">
          <Translate contentKey="ecomApp.lineItem.detail.title">LineItem</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="ecomApp.lineItem.id">Id</Translate>
            </span>
          </dt>
          <dd>{lineItemEntity.id}</dd>
          <dt>
            <span id="productId">
              <Translate contentKey="ecomApp.lineItem.productId">Product Id</Translate>
            </span>
          </dt>
          <dd>{lineItemEntity.productId}</dd>
          <dt>
            <span id="orderId">
              <Translate contentKey="ecomApp.lineItem.orderId">Order Id</Translate>
            </span>
          </dt>
          <dd>{lineItemEntity.orderId}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="ecomApp.lineItem.price">Price</Translate>
            </span>
          </dt>
          <dd>{lineItemEntity.price}</dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="ecomApp.lineItem.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{lineItemEntity.quantity}</dd>
          <dt>
            <span id="discount">
              <Translate contentKey="ecomApp.lineItem.discount">Discount</Translate>
            </span>
          </dt>
          <dd>{lineItemEntity.discount}</dd>
        </dl>
        <Button tag={Link} to="/line-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/line-item/${lineItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LineItemDetail;
