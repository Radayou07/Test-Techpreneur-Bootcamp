const User = { user: { name: 'Ana', scores: [10, 20], meta: { active: true } } }

const flattenDeep = (obj, prefix) => {
  //store the result
  let output = {};
  
  //iterate the object 
  for(let k in obj){
    let val = obj[k];
    
    //get the type
    const type = Object.prototype.toString.call(val);
    
    //object
    if(type === "[object Object]"){
      //new key
      const newKey = prefix ? prefix + "." + k : k;
      const newObj = flattenDeep(val, newKey);
      output = {...output, ...newObj};
      
    }
    //array
    else if(type === "[object Array]"){
      //iterate array
      for(let i = 0; i < val.length; i++){
        //new key
        const newKey = prefix ? prefix + "." + k + "." + `[${i}]` : k + "." + `[${i}]`;
        output = {...output, [newKey]: val[i]};
      }
    }
    // normal value
    else{
      //new key
      const newKey = prefix ? prefix + "." + k : k;
      output = {...output, [newKey]: val};
    }
  }
  
  return output;
}

console.log(flattenDeep(User))
module.exports = flattenDeep(User);