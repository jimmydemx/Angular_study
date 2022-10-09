export const schema =
{
  "type": "object",
  "properties": {
    "cat":{
      "type":["number", "null"]
    },
    "dog":{
      "type":["number"]
    },
    "pig":{
      "type":["string","null"]
    },
    "animal":{
      "type":"boolean"
    }
  },
    
    
    	"if": {
        	"properties": { "animal": { "const": true } }
      		},
      	"then":{
        	"properties": { "cat": { "type": "null" },  "dog": { "type": ["number","null"]} }
      	},
  




          
 
  
  
  
  
  

                    
}


//ipc:///tmp/zmq:TgjztupN8b",