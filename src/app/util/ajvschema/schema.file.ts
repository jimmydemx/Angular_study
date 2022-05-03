export const schema =
{
  type: "object",
  properties: {
    Has_persistence: {type: "boolean"},
    persistence: {
       type: "object",
       properties: {
        enabled: {type: "boolean"},
        file_descriptor: {type: "string"},
        expiration: {type: "integer"}
       },
       required:['enabled']
    },
    feedback: {type: "string"},
    variablesListName: {type: "string"},
    customApps:{type:'array'},
    retePosition: {
      type:'array',
      items:[{type:'number'},{type:'number'}],
      minItems:2,
      maxItems: 2
    },
    unique: {type: "boolean"},
    id: {type: "string"},
    name: {type: "string"},
    processType: {enum:['source']},
    state: {enum:[101,102,103,104,105]},
    desiredState: {enum:[101,102,103,104,105]},
    publisher: {type: "string"},
    moduleType: {enum:['timer']},
    timer_var_name: {type: "string"},
    interval: {type: "integer"},
    starting_hour: {type: "integer"},
    starting_minute: {type: "integer",minimum: 0,maximum:60},
    typeString: {enum:['TIMER']},
  },
  required: ["interval"],
  additionalProperties: false,
  if:{properties:{"Has_persistence":{const:true}}}, //12312
  then:{required:["feedback"]},
}


//ipc:///tmp/zmq:TgjztupN8b",