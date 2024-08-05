import React from 'react';
function Para()
{
    return(
    <div>
        <h1 style={{color:"green"}}>Inline style in JSX </h1>
          <p style={{color: 'darkblue',backgroundColor:'lightblue',padding:'10px',
            border:'1px solid blue',borderRadius:'5px'}}>This is a paragraph with inline styles applied.</p>
    </div>
    );
}
export default Para;