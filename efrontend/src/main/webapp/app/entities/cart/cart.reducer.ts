import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { cleanEntity } from 'app/shared/util/entity-utils';
import {
  IQueryParams,
  createEntitySlice,
  EntityState,
  serializeAxiosError,
} from 'app/shared/reducers/reducer.utils';
import { ICart, defaultValue } from 'app/shared/model/cart.model';

const initialState: EntityState<ICart> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const apiUrl = 'api/carts';

// Actions

export const getEntities = createAsyncThunk('carts/fetch_entity_list', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}cacheBuster=${new Date().getTime()}`;
  return axios.get<ICart[]>(requestUrl);
});

export const getEntity = createAsyncThunk(
  'carts/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<ICart>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getEntityByUserId = createAsyncThunk(
  'carts/fetch_entity_by_user_id',
  async (userId: string | number, thunkAPI) =>{
    const requestUrl =  `${apiUrl}/user-id/${userId}`;
    const result =  await axios.get<ICart>(requestUrl).catch((res)=>{
      thunkAPI.dispatch(createEntity({userId:Number(userId)}))
      return res;
    });
    return result
  },
  { serializeError: serializeAxiosError }
)

export const createEntity = createAsyncThunk(
  'carts/create_entity',
  async (entity: ICart, thunkAPI) => {
    const result = await axios.post<ICart>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntityByUserId(entity.userId));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateEntity = createAsyncThunk(
  'carts/update_entity',
  async (entity: ICart, thunkAPI) => {
    const result = await axios.put<ICart>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const partialUpdateEntity = createAsyncThunk(
  'carts/partial_update_entity',
  async (entity: ICart, thunkAPI) => {
    const result = await axios.patch<ICart>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteEntity = createAsyncThunk(
  'carts/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<ICart>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);


// slice

export const CartSlice = createEntitySlice({
  name: 'carts',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(getEntityByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
        localStorage.clear()
        localStorage.setItem("cartLineItemList",JSON.stringify(action.payload.data.cartLineItemDTOList));
        localStorage.setItem("cartId", JSON.stringify(action.payload.data.id))
      })
      .addCase(deleteEntity.fulfilled, state => {
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
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
      })
      .addMatcher(isPending(getEntities, getEntity, getEntityByUserId), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = CartSlice.actions;

// Reducer
export default CartSlice.reducer;

