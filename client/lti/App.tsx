import * as React from 'react';
import ColorService from '../ui/ColorService';
import * as _ from 'lodash';

const colorService = new ColorService();
const MaxDescLength = 100;

export default (props) => {
  const data = props.app.casaDescriptor;
  console.log('data:', data.identity);

  const { icon, description } = data.attributes.use;
  var app_id = data.identity.originator_id + data.identity.id;
  var color = colorService.getColorForString(app_id);
  var app_label = data.attributes.use.title.substring(0, 1).toUpperCase();
  var title = highlight(data.attributes.use.title, props.highlights);
  var background_style = {
      "background-color":color
  };

  var header = (
    <div className='app-header' style={background_style}>
      {icon ? <img className='app-icon' src={icon} /> : null}
      <span className='app-icon-label'>{title}</span>
    </div>
  );

  const shortDesc = description.length > MaxDescLength ?
    description.substr(0, MaxDescLength) + '...' :
    description;

  return (
    <div className='app'>
      {header}
      <div className='app-body'>
          {highlight(shortDesc, props.highlights)}
      </div>
    </div>
  );
}


// returns an array of spans, with class of 'highlighted if that matches the word'
const highlight = (text, words) => {
  if(text){
    var first = null;
    words.forEach(function(word){
      var index = text.toLowerCase().indexOf(word.toLowerCase());
      if(word !== '' &&
          index > -1 &&
          (first === null || index < first)){

        first = {
          val: word,
          i:index
        };
      }
    });

    if(first === null){
      //base case!
      return [(<span>{text}</span>)];
    } else {
      var unhigh    = text.substring(0, first.i);
      var high      = text.substring(first.i, first.i + first.val.length);
      var remaining = text.substring(first.i + first.val.length);
      console.log('with first: ', first);
      console.log('computed: ', unhigh, high, remaining);
      return [
        (<span>{unhigh}</span>),
        (<span className='highlight'>{high}</span>)
      ].concat(highlight(remaining, words));
    }
  }
}