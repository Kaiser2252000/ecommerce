import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './bill.reducer';

export const BillDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const billEntity = useAppSelector(state => state.bill.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="billDetailsHeading">
          <Translate contentKey="ecomApp.bill.detail.title">Bill</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="ecomApp.bill.id">Id</Translate>
            </span>
          </dt>
          <dd>{billEntity.id}</dd>
          <dt>
            <span id="orderId">
              <Translate contentKey="ecomApp.bill.orderId">Order Id</Translate>
            </span>
          </dt>
          <dd>{billEntity.orderId}</dd>
          <dt>
            <span id="userId">
              <Translate contentKey="ecomApp.bill.userId">User Id</Translate>
            </span>
          </dt>
          <dd>{billEntity.userId}</dd>
          <dt>
            <span id="customerId">
              <Translate contentKey="ecomApp.bill.customerId">Customer Id</Translate>
            </span>
          </dt>
          <dd>{billEntity.customerId}</dd>
          <dt>
            <span id="totalPrice">
              <Translate contentKey="ecomApp.bill.totalPrice">Total Price</Translate>
            </span>
          </dt>
          <dd>{billEntity.totalPrice}</dd>
          <dt>
            <span id="vat">
              <Translate contentKey="ecomApp.bill.vat">Vat</Translate>
            </span>
          </dt>
          <dd>{billEntity.vat}</dd>
          <dt>
            <span id="paymentDate">
              <Translate contentKey="ecomApp.bill.paymentDate">Payment Date</Translate>
            </span>
          </dt>
          <dd>
            {billEntity.paymentDate ? <TextFormat value={billEntity.paymentDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="status">
              <Translate contentKey="ecomApp.bill.status">Status</Translate>
            </span>
          </dt>
          <dd>{billEntity.status}</dd>
        </dl>
        <Button tag={Link} to="/bill" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bill/${billEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BillDetail;
