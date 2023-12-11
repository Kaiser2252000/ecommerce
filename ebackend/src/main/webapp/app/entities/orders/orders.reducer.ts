import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { cleanEntity } from 'app/shared/util/entity-utils';
import {
  IQueryParams,
  createEntitySlice,
  EntityState,
  serializeAxiosError,
  IUpdateStatus
} from 'app/shared/reducers/reducer.utils';
import { IOrders, defaultValue } from 'app/shared/model/orders.model';
import {IProduct} from "app/shared/model/product.model";

const initialState: EntityState<IOrders> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const apiUrl = 'api/admin/orders';

// Actions

export const getEntities = createAsyncThunk('orders/fetch_entity_list', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}cacheBuster=${new Date().getTime()}`;
  return axios.get<IOrders[]>(requestUrl);
});

export const getEntitiesNoPageable = createAsyncThunk('orders/fetch_entity_list_no_pageable', async() =>{
  const requestUrl = `${apiUrl}/nopageable`;
  return axios.get<IOrders[]>(requestUrl)
})
export const getEntity = createAsyncThunk(
  'orders/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IOrders>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createEntity = createAsyncThunk(
  'orders/create_entity',
  async (entity: IOrders, thunkAPI) => {
    const result = await axios.post<IOrders>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateEntity = createAsyncThunk(
  'orders/update_entity',
  async (entity: IOrders, thunkAPI) => {
    const result = await axios.put<IOrders>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const partialUpdateEntity = createAsyncThunk(
  'orders/partial_update_entity',
  async (entity: IOrders, thunkAPI) => {
    const result = await axios.patch<IOrders>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteEntity = createAsyncThunk(
  'orders/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IOrders>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateStatus = createAsyncThunk(
  'orders/update_status',
  async({id, status}:IUpdateStatus, thunkAPI) =>{
     const requestUrl = `${apiUrl}/${id}/${status}`;
     const result = await axios.post<IOrders>(requestUrl);
     return result;
  },
  { serializeError: serializeAxiosError }
)

// slice

export const OrdersSlice = createEntitySlice({
  name: 'orders',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(deleteEntity.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = {};
      })
      .addCase(updateStatus.fulfilled, state => {
      state.updating = false;
      state.updateSuccess = true;
      state.entity = {};
      })
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        const { data, headers } = action.payload;

        return {
          ...state,
          loading: false,
          entities: data,
          totalItems: parseInt(headers['x-total-count'], 10),
        };
      })
      .addMatcher(isFulfilled(getEntitiesNoPageable), (state, action) => {
        state.loading=false;
        state.entities=action.payload.data;
      })
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity, updateStatus), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
      })
      .addMatcher(isPending(getEntities, getEntity, getEntitiesNoPageable), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity, updateStatus), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = OrdersSlice.actions;

// Reducer
export default OrdersSlice.reducer;
