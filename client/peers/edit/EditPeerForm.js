import React from 'react';

export default (props) => {
  const {fields: {name, payloadUrl}, handleSubmit, submitting, createPeer} = props;
  return (
    <div className='content'>
      <div className='panel peer-edit'>
        <form onSubmit={handleSubmit(createPeer)}>
          <input type='text' name='name' placeholder='Name' {...name} />
          <input type='text' name='payloadUrl' placeholder='Payload Url' {...payloadUrl}/>
          <button className='btn' type="submit" disabled={submitting}>
            {submitting ? <i className='fa fa-circle-o-notch fa-spin'/> : null} Submit
          </button>
        </form>
      </div>
    </div>
  );
};
