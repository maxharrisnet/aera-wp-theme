import React from 'react';
import PropTypes from 'prop-types';
import Select from 'components/select';
import TextInput from 'components/text-input';
import Checkboxes from 'components/checkboxes';

import s from './HubspotForm.scss';

export default function HubspotField(props) {
  
  const { field } = props;

  const type = field.fieldType === 'email' || field.name === 'email' ? 'email' : 'text';
  const pattern = type === 'email' ?
    '^\\w+[-\\.\\w]*@(?!(?:gmail)\\.com$)\\w+[-\\.\\w]*?\\.\\w{2,4}$' : undefined; // eslint-disable-line
  const customValidity = type === 'email' ? 'Please use a company email address' : undefined;

  

  if (field.fieldType === 'checkbox') {
    return (
      <div className={s.hubspotForm__item}>
        <Checkboxes
          options={field.options}
          id={field.name}
          name={field.name}
          label={field.label}
        />
      </div>
    );
  }

  if (field.fieldType === 'textarea') {
    return (
      <div className={s(s.hubspotForm__item, s.hubspotForm__itemTabletFull)}>
        <TextInput
          className={s.hubspotForm__input}
          type={type}
          placeholder={field.label}
          id={field.name}
          required={field.required}
          multiline
        />
      </div>
    );
  }


  if (field.fieldType === 'select') {
    const defaultValue =
      field.defaultValue || (field.label === 'Country' && 'United States');

    const options = field.options
      .map(option => ({ name: option.label, value: option.value }));
    return (
      <div className={s.hubspotForm__item}>
        <Select
          label={field.label}
          defaultValue={defaultValue}
          id={field.name}
          options={options}
        />
      </div>
    );
  }


  return (
    <div className={s.hubspotForm__item}>
      <TextInput
        className={s.hubspotForm__input}
        type={type}
        placeholder={field.label}
        id={field.name}
        required={field.required}
        pattern={pattern}
        customValidity={customValidity}
      />
    </div>
  );
}

HubspotField.propTypes = {
  field: PropTypes.object,
};
