import React from 'react';

export default (props) => {
  const {fields: {name}, handleSubmit, submitting, createStorefront} = props;
  return (
    <div className='content'>
      <div className='panel storefront-edit'>
        <form onSubmit={handleSubmit(createStorefront)}>
          <input type='text' name='name' placeholder='Name' {...name} />
          <button className='btn' type="submit" disabled={submitting}>
            {submitting ? <i className='fa fa-circle-o-notch fa-spin'/> : null} Submit
          </button>
        </form>
      </div>
    </div>
  );
};
