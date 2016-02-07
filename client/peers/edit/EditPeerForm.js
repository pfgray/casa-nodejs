import React from 'react';

export default (props) => {
  const {fields: {name, payloadUrl}, handleSubmit, submitting, createPeer} = props;
  return (
    <div className='content'>
      <div className='panel peer-edit'>
        <form onSubmit={handleSubmit(createPeer)}>
          <input type='text' name='name' placeholder='name' {...name} />
          <input type='text' name='payloadUrl' placeholder='Payload Url' {...payloadUrl}/>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
        </form>
      </div>
    </div>
  );
};
