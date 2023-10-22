import { useEffect, useState } from 'react';
import { FieldError, FieldErrorsImpl, Merge, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TextField, FormControl, InputLabel, MenuItem, Select, FormHelperText, Button } from '@mui/material';
import { useAddProductMutation } from '../../api/products-api';
import ImageUploader from '../ImageUploader';
import { IProductFormInputs } from '../../typespaces/interfaces/IProductFormInputs';
import { IProductSubtype, IProductType } from '../../typespaces/interfaces/IProductsCategories';
import { mockCategories, mockSubTypes, mockTypes } from './mock-data'; // TODO: Нормальный запрос категорий сделать
import styles from './ProductForm.module.css';

/*
TODO:
- Что-то консоль ругается на мой селект с сategory, разберись
- Решить вопрос со сбросом селектов после отправки формы. В данный момент никак их не сбрасываю, так хотя бы нет ошибок неочевидных... а хотя нет, можно поменять категорию, при этом подкатегория сбросится, но валидацию всё равно пройдёт, так как какое-то значение останется - то же самое, что было и в прошлый раз. Так что, при текущей реализации, как минимум при смене категории надо сбрасывать значение типа. Однако посмотрю ещё как при подключении бэка всё это поменяется.
Пока в качестве костыля можно так - 3 секунды показывать, что форма успешно отправлена (или ошибку), затем редиректить на список продуктов (кстати у меня это будет смена стейта и надо посмотреть будут ли сохраняться значения полей и прочее при этом)
Или можно вместе со статусом отправки формы (как ошибки, так и успеха) отображать 2 кнопки - добавить товар, вернуться к таблице товаров
Если не решу этот вопрос малой кровью, то для редактирования и добавления сделать отдельные страницы: /products/add и products/:id/edit
- Вообще, по хорошему, тут далеко не всё про форму... (слишком много лишнего в этом компоненте)
*/

const getErrorDescription = (message: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>) => {
  return <div className={styles.errorDescription}>{message as React.ReactNode}</div>;
};

const ProductForm = () => {
  const {
    register,
    handleSubmit: handleSubmitWrapper,
    formState: { errors, isSubmitSuccessful },
    reset,
    watch,
  } = useForm<IProductFormInputs>({
    mode: 'onSubmit',
    defaultValues: {
      productName: '',
      description: '',
      price: '',
      discount: '',
      category: '',
      type: '',
      subtype: '',
      photos: [],
    },
  });

  const [addProduct, { isLoading: createProductLoading, isSuccess: createProductSuccess, error: createProductError }] =
    useAddProductMutation();

  const navigate = useNavigate();

  const [targetTypes, setTargetTypes] = useState<IProductType[]>([]);
  const [targetSubtypes, setTargetSubtypes] = useState<IProductSubtype[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  useEffect(() => {
    // Сбрасывай лучше сам, пожалуй и только на код 201 с сервера. А то этот сброс на категории как-то странно работает.
    // А ещё, не смотря на баловство с зависимостями, ты всё равно срабатываешь когда не надо (при первой отрисовке формы, что будет критично при редактировании), так что, пожалуй, откажусь от тебя.
    reset({
      productName: '',
      description: '',
      price: '',
      discount: '',
    });
  }, [isSubmitSuccessful, reset]);

  const watchCategoryValue = watch('category');
  const watchTypeValue = watch('type');

  useEffect(() => {
    if (watchCategoryValue) {
      const types = mockTypes.filter((type) => type.parentCategory === watchCategoryValue);
      if (types) {
        setTargetTypes(types);
        setTargetSubtypes([]);
      }
    }
  }, [watchCategoryValue]);

  useEffect(() => {
    if (watchTypeValue) {
      const subtypes = mockSubTypes.filter((subtype) => subtype.parentType === watchTypeValue);
      if (subtypes) {
        setTargetSubtypes(subtypes);
      }
    }
  }, [watchTypeValue]);

  const handleSubmit = async (data: IProductFormInputs) => {
    try {
      // TODO
      // Поля очищать и дизаблить (кнопку сабмит лучше, до момента успешного ответа), пока статус отправки не вернется. Лучше даже очищать только тогда, если он ок.
      // Отправка на бэк, собственно.
      const productFormData = new FormData();

      for (const param in data) {
        const key = param as keyof Omit<IProductFormInputs, 'photos'>;
        if (!data[key] || (Array.isArray(data[key]) && !data[key]?.length)) {
          delete data[key];
        } else {
          productFormData.append(key, data[key]!.trim());
        }
      }

      if (uploadedFiles.length) {
        uploadedFiles.forEach((file) => {
          productFormData.append('photos', file, file.name);
        });
      }
      await addProduct(productFormData);
      setUploadedFiles([]);
      // setValue('category', '');
      // Значение категории сбрасывается, но не сбрасывается лэйбл - нужно читать по специфике работы муишных селектов
    } catch (err) {
      console.error(err);
    }
  };

  if (createProductError) {
    navigate('/error', { state: { isEdit: false, sourcePage: 'products', error: createProductError } });
  }

  if (createProductSuccess) {
    navigate('/success', { state: { isEdit: false, sourcePage: 'products' } });
  }

  return (
    <form onSubmit={handleSubmitWrapper(handleSubmit)}>
      {/* TODO: Вообще margin=normal не достаточно, чтобы интерфейс не дёргался при появлении дескрипшина ошибок. Но можно уменьшить шрифт в них или сделать их абсолютами */}
      <FormControl
        margin="normal"
        fullWidth
      >
        <InputLabel
          htmlFor="product-name"
          className="visually-hidden"
        >
          Название товара
        </InputLabel>
        <TextField
          id="product-name"
          label="Название товара"
          variant="outlined"
          autoComplete="off"
          error={!!errors?.productName}
          helperText={errors?.productName?.message && getErrorDescription(errors.productName.message)}
          {...register('productName', {
            required: 'Укажите название товара',
            minLength: {
              value: 2,
              message: 'Название товара должно быть не короче двух символов',
            },
            maxLength: {
              value: 30,
              message: 'Название товара должно быть не длиннее тридцати символов',
            },
          })}
        />
      </FormControl>

      <FormControl
        margin="normal"
        fullWidth
      >
        <InputLabel
          htmlFor="product-description"
          className="visually-hidden"
        >
          Описание товара
        </InputLabel>
        <TextField
          id="product-description"
          label="Описание товара"
          variant="outlined"
          autoComplete="off"
          multiline
          error={!!errors?.description}
          helperText={errors?.description?.message && getErrorDescription(errors.description.message)}
          {...register('description', {})}
        />
      </FormControl>

      <FormControl
        margin="normal"
        fullWidth
      >
        <InputLabel
          htmlFor="product-price"
          className="visually-hidden"
        >
          Описание товара
        </InputLabel>
        <TextField
          id="product-price"
          label="Цена"
          variant="outlined"
          autoComplete="off"
          error={!!errors?.price}
          helperText={errors?.price?.message && getErrorDescription(errors.price.message)}
          {...register('price', {
            required: 'Поле должно быть заполнено',
            pattern: {
              value: /^\d+(\.\d\d)?$/,
              message: 'Допустимо положительное целое число или число с двумя знаками после точки',
            },
          })}
        />
      </FormControl>

      <FormControl
        margin="normal"
        fullWidth
      >
        <InputLabel
          htmlFor="product-discount"
          className="visually-hidden"
        >
          Описание товара
        </InputLabel>
        <TextField
          // TODO: Пока думаю как поправить, чтобы не трогать валидацию на бэке (формдата ест только строковые значения)
          disabled
          id="product-discount"
          label="Скидка"
          variant="outlined"
          autoComplete="off"
          error={!!errors?.discount}
          helperText={errors?.discount?.message && getErrorDescription(errors.discount.message)}
          {...register('discount', {
            pattern: {
              value: /^[0-9][0-9]?$|^100$/,
              message: 'Допустимо положительное целое число от 0 до 100',
            },
          })}
        />
      </FormControl>

      <FormControl
        margin="normal"
        fullWidth
        error={!!errors?.category}
      >
        <InputLabel id="product-category">Категория товара</InputLabel>
        <Select
          labelId="product-category"
          label="Категория товара"
          variant="outlined"
          {...register('category', {
            required: 'Нужно выбрать категорию',
          })}
        >
          {mockCategories.map((category, i) => {
            return (
              <MenuItem
                key={i}
                value={category._id}
              >
                {category.productCategoryName}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>{errors?.category?.message && getErrorDescription(errors.category.message)}</FormHelperText>
      </FormControl>

      {!!targetTypes.length && (
        <FormControl
          margin="normal"
          fullWidth
          error={!!errors?.type}
        >
          <InputLabel id="product-type">Тип товара</InputLabel>
          <Select
            labelId="product-type"
            label="Тип товара"
            variant="outlined"
            {...register('type', {
              required: 'Нужно выбрать тип',
            })}
          >
            {targetTypes.map((type, i) => {
              return (
                <MenuItem
                  key={i}
                  value={type._id}
                >
                  {type.productTypeName}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>{errors?.type?.message && getErrorDescription(errors.type.message)}</FormHelperText>
        </FormControl>
      )}

      {!!targetSubtypes.length && (
        <FormControl
          margin="normal"
          fullWidth
          error={!!errors?.type}
        >
          <InputLabel id="product-subtype">Подтип товара</InputLabel>
          <Select
            labelId="product-subtype"
            label="Подтип товара"
            variant="outlined"
            {...register('subtype', {})}
          >
            {targetSubtypes.map((subtype, i) => {
              return (
                <MenuItem
                  key={i}
                  value={subtype._id}
                >
                  {subtype.productSubtypeName}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>{errors?.subtype?.message && getErrorDescription(errors.subtype.message)}</FormHelperText>
        </FormControl>
      )}

      <ImageUploader
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
        view="both"
      />

      <Button
        variant="outlined"
        type="submit"
        disabled={createProductLoading}
      >
        {!createProductLoading ? 'Отправить форму' : 'Отправка формы...'}
      </Button>
    </form>
  );
};

export default ProductForm;
