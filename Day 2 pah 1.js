import React from 'react';

const Day2pah1 = () => {
const instyle={
margintop:'100px',
marginleft:'500px',
padding:'10px'
};
const fstyle={
  backgroundColor:"lightblue",
  height:'400px',
  width:'500px'
};
  const handleSubmit = (event) => {
    event.preventDefault(); 
    
    const inputel1 = document.getElementById('in1');
    const inputval1 = inputel1.value;
    const inputel2 = document.getElementById('in2');
    const inputval2 = inputel2.value;
    const inputel3 = document.getElementById('in3');
    const inputval3 = inputel3.value;

    console.log('Name:', inputval1+" "+'Email: ',inputval2+" "+'Message: '+inputval3); 
  };

  return (
    <center><div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit} style={fstyle}>
        <br></br>
        <br></br>
        <div>
          <label>Name:</label>
          <input
            type="text"
            id="in1" style={instyle}
            required
          />
          <br></br>
          <br></br>
          <label>Email:</label>
          <input type='email' id='in2' required style={instyle}></input>
          <br></br>
          <br></br>
          <label>Message:</label>
          <textarea placeholder="Enter the Message" rows={5} cols={20} id='in3' required style={instyle}></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div></center>
  );
};

export default Day2pah1;